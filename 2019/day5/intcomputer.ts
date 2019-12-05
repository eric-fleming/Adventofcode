/*Dependent Modules*/
import { readInput, inputToArray } from '../shared_functions/common';
import { OpCodeInstruction } from './opCodeInstruction';

const rawInput = readInput('day5input.txt');
// Global variables
let opCodeArray = [];
let input: number;

// start or restart the machine
function initializeMem(inputVal: number) {
    opCodeArray = inputToArray(rawInput, 'number', ',');
    input = inputVal; //1
}


// refactored createOpCodeObj(code, c)
// now it is the class OpCodeInstruction



// 0 mean pass by reference
function oldOpCode(opCodeObj) {
    // opcodes 1 and 2
    let condtion12 = (opCodeObj['p1'] === 0 && opCodeObj['p2'] === 0 && opCodeObj['p3'] === 0);
    // opcodes 3 and 4
    let condition34 = (opCodeObj['p1'] === 0 && opCodeObj['p2'] === undefined && opCodeObj['p3'] === undefined);
    return condtion12 || condition34;
}

// 1 means to pass by value, zero by reference, at least one param must be 1
function newOpCode(opCodeObj) {
    // true || undefined == true
    // so if the param does not exist it will not affect the result
    // ones mean pass by value
    return (opCodeObj['p1'] === 1 || opCodeObj['p2'] === 1 || opCodeObj['p2'] === 1);
}

function assemblyOpCode(opCodeObj) {
    let action = opCodeObj['action'];
    return (action === 5 || action === 6 || action === 7 || action === 8);
}


// implemented function executed in while loop
// for opcodes 1, 2, 3, 4
function applyOldOpCode(c: number) {
    //grabbing the locations
    let left = opCodeArray[c + 1];
    let right = opCodeArray[c + 2];
    let output = opCodeArray[c + 3];
    // execute
    if (opCodeArray[c] === 1) {
        opCodeArray[output] = opCodeArray[left] + opCodeArray[right];
    }
    else if (opCodeArray[c] === 2) {
        opCodeArray[output] = opCodeArray[left] * opCodeArray[right];
    }
    else if (opCodeArray[c] === 3) {
        // supposed to prompt but I just cached it
        opCodeArray[left] = input;
    }
    else if (opCodeArray[c] === 4) {
        // treat the input as a reference
        console.log(`output : ${opCodeArray[left]}`);
    }
}

// implemented function executed in while loop
// for opcodes 1, 2, 3, 4
function applyNewOpCode(opcode_idx: number, opCodeObj: any) {
    // cache for readability
    let action = opCodeObj['action'];
    // cautionary check for malformed input
    if (opCodeObj['p3'] === 1) {
        console.log('How in the world does this make any sense for the output address to NOT BE an address??');
    }
    else if (action === 1 || action === 2) {
        //staging the locations
        let left: number, right: number;
        let output: number = opCodeArray[opcode_idx + 3];
        if (opCodeObj['p1'] === 1) {
            left = opCodeArray[opcode_idx + 1];
        } else {
            left = opCodeArray[opCodeArray[opcode_idx + 1]];
        }
        if (opCodeObj['p2'] === 1) {
            right = opCodeArray[opcode_idx + 2];
        } else {
            right = opCodeArray[opCodeArray[opcode_idx + 2]];
        }
        // execute
        if (action === 1) {
            opCodeArray[output] = left + right;
        }
        else if (action === 2) {
            opCodeArray[output] = left * right;
        }
    }
    else if (action === 3) {
        // place the literal value into input
        input = opCodeArray[opcode_idx + 1];
    }
    else if (action === 4) {
        // output the literal input value
        console.log(`output : ${opCodeArray[opcode_idx + 1]}`);
    }
}

// implemented function executed in while loop
// for opcodes 5, 6, 7, 8
function applyAssemblyOpCode(opcode_idx: number, opCodeObj: any) {
    // cache for readability
    let action = opCodeObj['action'];
    //staging the locations
    let p1: number;
    let p2: number;
    let p3: number;
    // load params
    if (opCodeObj['p1'] === 1) {
        p1 = opCodeArray[opcode_idx + 1];
    } else if (opCodeObj['p1'] === 0) {
        p1 = opCodeArray[opCodeArray[opcode_idx + 1]];
    }
    if (opCodeObj['p2'] === 1) {
        p2 = opCodeArray[opcode_idx + 2];
    } else if (opCodeObj['p2'] === 0) {
        p2 = opCodeArray[opCodeArray[opcode_idx + 2]];
    }
    // always a pointer
    if (opCodeObj['p3'] === 1) {
        p3 = opCodeArray[opcode_idx + 3];
    } else if (opCodeObj['p3'] === 0) {
        p3 = opCodeArray[opcode_idx + 3];
    }

    // execute
    if (action === 5 && p1 !== 0) {
        return p2;
    }
    else if (action === 6 && p1 === 0) {
        return p2;
    }
    else if (action === 7) {
        if (p1 < p2) {
            opCodeArray[p3] = 1;
        } else {
            opCodeArray[p3] = 0;
        }
    }
    else if (action === 8) {
        if (p1 === p2) {
            opCodeArray[p3] = 1;
        } else {
            opCodeArray[p3] = 0;
        }
    }

    // unreadable, action was prescreened before method call.
}












function compute(init: number) {
    if(init === 1){
        console.log('First challenge')
    }
    if(init === 5){
        console.log('Second challenge')
    }
    initializeMem(init);
    let maxLength = opCodeArray.length;

    // run through the opCodeArray
    let c = 0
    let i: number;
    let optype: string;
    while (c < maxLength) {
        // extract from Intcode and make handling object
        let code = opCodeArray[c];
        /**
        if(c < 7){
            console.log(`PC: ${c};    memory[225] = ${opCodeArray[225]}`);
        }*/
        // use this to verify what functions to call to modify the opCodeArray
        let opCodeObj = new OpCodeInstruction(code,c);
        //console.table(opCodeObj);
        let action = opCodeObj['action'];
        let override;
        if (action === 99) {
            console.log('-- HALT --');
            break;
        }
        else if (assemblyOpCode(opCodeObj)) {
            optype = 'assembly';
            // set for-loop incrementer
            i = opCodeObj['jump'];
            override = applyAssemblyOpCode(c, opCodeObj);
        }
        else if (oldOpCode(opCodeObj)) {
            optype = 'old';
            applyOldOpCode(c);
            // set for-loop incrementer
            if (action === 1 || action === 2) { i = 4; }
            else if (action === 3 || action === 4) { i = 2; }
        }
        else if (newOpCode(opCodeObj)) {
            optype = 'new';
            // set for-loop incrementer
            i = opCodeObj['jump'];
            // select and perform action
            applyNewOpCode(c, opCodeObj);
        }
        else {
            console.log(`Error: unknown op-code!\n Found at index ${c}\n`);
            console.table(opCodeObj);
            break;
        }
        //console.log(`completed opcode index ${c} with ${optype}`);
        c = c + i;
        // this value will exist if something is output from a jump call
        // the index of the jump is override
        if (!!override) {
            c = override;
        }
    }
}



// main method to run the program
function main(init1: number, init2: number) {
    if (init1 !== 0) {
        console.log('------  First Challenge Started -----');
        compute(init1);
        console.log('------  Challend Completed -----------');
    }
    if (init2 !== 0) {
        console.log('------  Second Challenge Started -----');
        compute(init2);
        console.log('------  Challend Completed -----------');
    }
}

main(1, 5);