"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var phasecodes_1 = require("./phasecodes");
var amplifier_1 = require("./amplifier");
var rawInput = common_1.readInput('day7input.txt');
function firstChallenge(numOfAmplifiers, fileName) {
    var phasecodes = phasecodes_1.generatePermutations(numOfAmplifiers);
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
        console.log("---- Next Phase Code ----");
    }
    console.table(trusterOutputs);
    // trusterOuput list is complete, find max.
    var max = Math.max.apply(Math, trusterOutputs);
    console.log("=========================================");
    console.log("The maximum Truster Output is " + max);
    console.log("=========================================");
}
function secondChallenge() { }
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(5, 'day7input.txt');
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, false);
