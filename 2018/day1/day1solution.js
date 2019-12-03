"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var inputArray = common_1.inputToNumberArray('day1input.txt', '\n');
function firstChallenge() {
    var sum = function (a, b) { return a + b; };
    var total = inputArray.reduce(sum);
    console.log("The final frequency is " + total);
}
function secondChallenge() {
    // initialize
    var sum = 0;
    var sumlist = [0];
    var seen = new Set();
    seen.add(0);
    var len = inputArray.length - 1;
    // start search
    for (var f = 0; f < len; f++) {
        sum += inputArray[f];
        sumlist.push(sum);
        // check to see if it is already there
        if (seen.has(sum)) {
            console.log("We have seen " + sum + " frequency already!");
            //console.table(sumlist);
            break;
        }
        // put in
        seen.add(sum);
        // restart if you reach the end
        if (f === len - 1) {
            f = -1;
        }
    }
}
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
