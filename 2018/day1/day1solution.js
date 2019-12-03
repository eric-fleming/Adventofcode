"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var inputArray = common_1.inputToNumberArray('day1input.txt', '\n');
function firstChallenge() {
    var sum = function (a, b) { return a + b; };
    var total = inputArray.reduce(sum);
    console.log(total);
}
function secondChallenge() { }
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge();
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, true);
