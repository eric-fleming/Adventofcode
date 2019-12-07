"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var intCodeComputer_1 = require("../day5/intCodeComputer");
var phasecodes_1 = require("./phasecodes");
var rawInput = common_1.readInput('day7input.txt');
function firstChallenge(numOfAmplifiers) {
    var phasecodes = phasecodes_1.generatePermutations(numOfAmplifiers);
    //console.table(phasecodes);
    var Computer = new intCodeComputer_1.IntCodeComputer();
    var codes = 0;
    for (var p = 0; p < phasecodes.length; p++) {
        for (var a = 0; a < numOfAmplifiers; a++) {
            var input = phasecodes[p][a];
            if (input !== undefined) {
                codes++;
            }
        }
    }
    console.log(codes);
    //Computer.loadInstructions(permuation, 'day7input.txt');
    //Computer.run();
    //Computer.reset();
}
function secondChallenge() { }
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(5);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, false);
