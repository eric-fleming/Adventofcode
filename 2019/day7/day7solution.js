"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var phasecodes_1 = require("./phasecodes");
var amplifier_1 = require("./amplifier");
var rawInput = common_1.readInput('day7input.txt');
function firstChallenge(numOfAmplifiers, seed, fileName) {
    var phasecodes = phasecodes_1.generatePermutations(numOfAmplifiers, seed);
    //console.table(phasecodes);
    var trusterOutputs = [];
    for (var p = 0; p < phasecodes.length; p++) {
        var nextInputSignal = 0; // set this to the next outputSignal
        var lastOutput = void 0;
        for (var a = 0; a < numOfAmplifiers; a++) {
            var phaseSetting = phasecodes[p][a];
            var Amp = new amplifier_1.Amplifier(phaseSetting, nextInputSignal, fileName);
            Amp.run();
            nextInputSignal = Amp.getOutputSignal();
            if (a === (numOfAmplifiers - 1)) {
                lastOutput = nextInputSignal;
            }
        }
        trusterOutputs.push(lastOutput);
        //console.log(`---- Next Phase Code ----`);
    }
    console.table(trusterOutputs);
    // trusterOuput list is complete, find max.
    var max = Math.max.apply(Math, trusterOutputs);
    console.log("=========================================");
    console.log("The maximum Truster Output is " + max);
    console.log("=========================================");
}
function secondChallenge(numOfAmplifiers, seed, fileName) {
    var phasecodes = phasecodes_1.generatePermutations(numOfAmplifiers, seed);
    //console.table(phasecodes);
    var trusterOutputs = [];
    loop1: for (var p = 0; p < phasecodes.length; p++) {
        var nextInputSignal = 0; // set this to the next outputSignal
        var lastOutput = void 0;
        loop2: for (var a = 0; a < numOfAmplifiers; a++) {
            // set up
            var phaseSetting = phasecodes[p][a];
            var currentInput = nextInputSignal;
            // calculate next output, future input
            var Amp = new amplifier_1.Amplifier(phaseSetting, currentInput, fileName);
            Amp.run();
            nextInputSignal = Amp.getOutputSignal();
            // halting condition??
            if (nextInputSignal === undefined) {
                lastOutput = currentInput;
                break loop2;
            }
            // if you've reached Amp E
            if (a === (numOfAmplifiers - 1)) {
                lastOutput = nextInputSignal;
                // go around again.
                a = 0;
            }
        }
        trusterOutputs.push(lastOutput);
        //console.log(`---- Next Phase Code ----`);
    }
    console.table(trusterOutputs);
    // trusterOuput list is complete, find max.
    var max = Math.max.apply(Math, trusterOutputs);
    console.log("=========================================");
    console.log("The maximum Truster Output is " + max);
    console.log("=========================================");
}
// main method to run the program
function main(first, second) {
    // parameters
    // challenge (number of amps, seed value for phase settings, opcode instructions)
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(5, 0, 'day7input.txt');
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge(5, 5, 'day7input.txt');
        console.log('------  Challend Completed -----------');
    }
}
main(false, true);
