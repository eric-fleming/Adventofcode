/*Dependent Modules*/
import { readInput, inputToArray } from '../shared_functions/common';

const rawInput = readInput('day2input.txt');
let opCodeArray = [];


// start or restart the machine
function initializeMem(firstVal:number, secondVal:number){
    opCodeArray = inputToArray(rawInput, 'number', ',');
    opCodeArray[1] = firstVal; //12
    opCodeArray[2] = secondVal; //2
}


// run the addition or multiplication routine
function applyOpCode(opcode_idx: number, left_idx: number, right_idx: number, output_idx: number){
    if (opCodeArray[opcode_idx] === 1) {
        opCodeArray[output_idx] = opCodeArray[left_idx] + opCodeArray[right_idx];
    }
    else if (opCodeArray[opcode_idx] === 2) {
        opCodeArray[output_idx] = opCodeArray[left_idx] * opCodeArray[right_idx];
    }
}




function firstChallenge(first:number, second:number){

    initializeMem(first, second);
    let maxLength = opCodeArray.length;
    
    for(let c = 0; c < maxLength; c = c + 4){
        //grabbing the locations
        let left = opCodeArray[c + 1];
        let right = opCodeArray[c + 2];
        let output = opCodeArray[c + 3];
        
        if (opCodeArray[c] === 1 || opCodeArray[c] === 2){
            applyOpCode(c, left, right, output);
        }
        else if (opCodeArray[c] === 99){
            console.log('-- HALT --');
            break;
        }
        else{
            console.log('Error: unknown op-code!');
            break;
        }
    }
    console.log(`opCodeArray[0] = ${opCodeArray[0]}`);
    //console.table(opCodeArray);
    return opCodeArray[0]
}

function secondChallenge(setValidation:number, setSize:number){
    
    const validation = setValidation;
    const size = setSize;
    loop1:
    for(let x = 0; x < size; x++){
        loop2:
        for(let y = 0; y < size; y++){
            let output = firstChallenge(x,y);
            if(output === validation){
                console.log(`(x,y) = (${x},${y}) = ${100*x + y}`);
                break loop1;
            }
        }
    }
    console.log('Hopefully something returns');
}


// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(12, 2);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge(19690720, 100);
        console.log('------  Challend Completed -----------');
    }
}

main(true, true);