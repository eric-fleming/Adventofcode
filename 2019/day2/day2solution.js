"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var rawInput = common_1.readInput('day2input.txt');
var opCodeArray = [];
// start or restart the machine
function initializeMem(firstVal, secondVal) {
    opCodeArray = common_1.inputToArray(rawInput, 'number', ',');
    opCodeArray[1] = firstVal; //12
    opCodeArray[2] = secondVal; //2
}
// run the addition or multiplication routine
function applyOpCode(opcode_idx) {
    //grabbing the locations
    var left = opCodeArray[opcode_idx + 1];
    var right = opCodeArray[opcode_idx + 2];
    var output = opCodeArray[opcode_idx + 3];
    // execute
    if (opCodeArray[opcode_idx] === 1) {
        opCodeArray[output] = opCodeArray[left] + opCodeArray[right];
    }
    else if (opCodeArray[opcode_idx] === 2) {
        opCodeArray[output] = opCodeArray[left] * opCodeArray[right];
    }
}
function firstChallenge(first, second) {
    initializeMem(first, second);
    var maxLength = opCodeArray.length;
    for (var c = 0; c < maxLength; c = c + 4) {
        if (opCodeArray[c] === 1 || opCodeArray[c] === 2) {
            applyOpCode(c);
        }
        else if (opCodeArray[c] === 99) {
            console.log('-- HALT --');
            break;
        }
        else {
            console.log('Error: unknown op-code!');
            break;
        }
    }
    console.log("opCodeArray[0] = " + opCodeArray[0]);
    //console.table(opCodeArray);
    return opCodeArray[0];
}
function secondChallenge(setValidation, setSize) {
    var validation = setValidation;
    var size = setSize;
    loop1: for (var x = 0; x < size; x++) {
        loop2: for (var y = 0; y < size; y++) {
            var output = firstChallenge(x, y);
            if (output === validation) {
                console.log("(x,y) = (" + x + "," + y + ") = " + (100 * x + y));
                break loop1;
            }
        }
    }
    console.log('Hopefully something returns');
}
// main method to run the program
function main(first, second) {
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
main(true, false);
