"use strict";
exports.__esModule = true;
var common_1 = require("../shared/common");
var log = console.log;
var depths = (0, common_1.inputToNumberArray)('input1.txt', '\n');
function part1() {
    var increases = 0;
    for (var d = 1; d < depths.length; d++) {
        if (depths[d] > depths[d - 1]) {
            increases++;
        }
    }
    log("There are ".concat(increases, " in the depths"));
}
function part2() {
    var increases = 0;
    for (var d = 3; d < depths.length; d++) {
        var firstTriple = depths[d - 3] + depths[d - 2] + depths[d - 1];
        var secondTriple = depths[d - 2] + depths[d - 1] + depths[d];
        if (secondTriple > firstTriple) {
            increases++;
        }
    }
    log("There are ".concat(increases, " in the depths"));
}
function betterSecondChallenge() {
    var increases = 0;
    for (var d = 3; d < depths.length; d++) {
        if (depths[d] > depths[d - 3]) {
            increases++;
        }
    }
    log("There are ".concat(increases, " in the depths"));
}
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        part1();
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        part2();
        console.log('------  Challend Completed -----------');
    }
}
main(true, true);
