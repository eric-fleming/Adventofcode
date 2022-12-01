"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var table = console.table;
var rawInput = (0, common_1.inputToStringArray)('day1.input.txt', '\n');
//console.table(rawInput);
function part1() {
    var answer;
    log("".concat(answer));
}
function part2() {
    var answer;
    log("".concat(answer));
}
// main method to run the program
function main(first, second) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        log('--------------------------------------');
        part1();
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        log('--------------------------------------');
        part2();
        log('\n\n');
    }
}
main(true, false);
