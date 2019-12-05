"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var rawInput = common_1.readInput('day5input.txt');
// Global variables
var opCodeArray = [];
var input;
// start or restart the machine
function initializeMem(inputVal) {
    opCodeArray = common_1.inputToArray(rawInput, 'number', ',');
    input = inputVal; //1
}
// run the addition or multiplication routine
function applyOldOpCode(opcode_idx) {
    //grabbing the locations
    var left = opCodeArray[opcode_idx + 1];
    var right = opCodeArray[opcode_idx + 2];
    var output = opCodeArray[opcode_idx + 3];
    if (opCodeArray[opcode_idx] === 1) {
        opCodeArray[output] = opCodeArray[left] + opCodeArray[right];
    }
    else if (opCodeArray[opcode_idx] === 2) {
        opCodeArray[output] = opCodeArray[left] * opCodeArray[right];
    }
    else if (opCodeArray[opcode_idx] === 3) {
        // since there is only one param, the left index is the first param
        input = left;
    }
    else if (opCodeArray[opcode_idx] === 4) {
        // treat the input as a reference
        console.log("output : " + opCodeArray[input]);
    }
}
function createOpCodeObj(code, c) {
    var action = code % 100; // returns 1, 2, 3, 4, or 99
    var params = (code - action) / 100; // clears the action
    var opCode = {};
    opCode['action'] = action;
    // set the param modes for the next inputs
    if (action === 99) {
        return opCode;
    }
    else {
        // there is something to do and everyone has at least one param
        opCode['p1'] = params % 10;
        if (action === 3 || action === 4) {
            opCode['jump'] = 2;
            return opCode;
        }
        else if (action === 1 || action === 2) {
            opCode['p2'] = Math.floor((params % 100) / 10);
            opCode['p3'] = Math.floor(params / 100);
            opCode['jump'] = 4;
            return opCode;
        }
        else {
            console.log("Invalid opcode : " + action + " at index " + c);
            return;
        }
    }
}
// zeros mean pass by reference
function oldOpCode(opCodeObj) {
    // opcodes 1 and 2
    var condtion12 = (opCodeObj['p1'] === 0 && opCodeObj['p2'] === 0 && opCodeObj['p3'] === 0);
    // opcodes 3 and 4
    var condition34 = (opCodeObj['p1'] === 0 && opCodeObj['p2'] === undefined && opCodeObj['p3'] === undefined);
    return condtion12 || condition34;
}
function newOpCode(opCodeObj) {
    // true || undefined == true
    // so if the param does not exist it will not affect the result
    // ones mean pass by value
    return (opCodeObj['p1'] === 1 || opCodeObj['p2'] === 1 || opCodeObj['p2'] === 1);
}
function applyNewOpCode(opcode_idx, opCodeObj) {
    // cache for readability
    var action = opCodeObj['action'];
    // cautionary check for malformed input
    if (opCodeObj['p3'] === 1) {
        console.log('How in the world does this make any sense for the output address to not be an address');
    }
    else if (action === 1 || action === 2) {
        //staging the locations
        var left = void 0, right = void 0;
        var output = opCodeArray[opcode_idx + 3];
        if (opCodeObj['p1'] === 1) {
            left = opCodeArray[opcode_idx + 1];
        }
        else {
            left = opCodeArray[opCodeArray[opcode_idx + 1]];
        }
        if (opCodeObj['p2'] === 1) {
            right = opCodeArray[opcode_idx + 2];
        }
        else {
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
        console.log("output : " + input);
    }
}
function firstChallenge(init) {
    initializeMem(init);
    var maxLength = opCodeArray.length;
    // run through the opCodeArray
    var c = 0;
    var i;
    var optype;
    while (c < maxLength) {
        // extract from Intcode and make handling object
        var code = opCodeArray[c];
        // use this to verify what functions to call to modify the opCodeArray
        var opCodeObj = createOpCodeObj(code, c);
        console.table(opCodeObj);
        if (opCodeObj['action'] === 99) {
            console.log('-- HALT --');
            break;
        }
        else if (oldOpCode(opCodeObj)) {
            optype = 'old';
            applyOldOpCode(c);
            // set for-loop incrementer
            if (opCodeObj['action'] === 1 || opCodeObj['action'] === 2) {
                i = 4;
            }
            else if (opCodeObj['action'] === 3 || opCodeObj['action'] === 4) {
                i = 2;
            }
        }
        else if (newOpCode(opCodeObj)) {
            optype = 'new';
            // set for-loop incrementer
            i = opCodeObj['jump'];
            // select and perform action
            applyNewOpCode(c, opCodeObj);
        }
        else {
            console.log("Error: unknown op-code!\n Found at index " + c + "\n");
            console.table(opCodeObj);
            break;
        }
        console.log("completed opcode index " + c + " with " + optype);
        c = c + i;
    }
}
function secondChallenge() { }
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(1);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, false);
// old testing functions
function testOpCodes() {
    // Testing opCode deduction
    var index = -1;
    console.table(createOpCodeObj(11101, index));
    console.table(createOpCodeObj(11102, index));
    console.table(createOpCodeObj(103, index));
    console.table(createOpCodeObj(4, index));
    console.table(createOpCodeObj(11002, index));
    console.table(createOpCodeObj(10102, index));
    console.table(createOpCodeObj(1102, index));
    // all checks out
    // Testing boolean expressions
    var temp = {};
    temp['p1'] = 0;
    //temp['p2'] = 0;
    //temp['p3'] = 0;
    console.log(oldOpCode(temp));
    // works now
}
