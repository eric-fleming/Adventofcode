"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var table = console.table;
var rawInput = (0, common_1.inputToNumberArray)('input-day1.txt', '\n');
//console.table(rawInput);
function part1() {
    var elfTotalCals = [];
    var subtotal = 0;
    for (var k = 0; k < rawInput.length; k++) {
        if (rawInput[k] == 0) {
            elfTotalCals.push(subtotal);
            subtotal = 0;
            continue;
        }
        else {
            subtotal += rawInput[k];
        }
    }
    var answer;
    table("".concat(Math.max.apply(Math, elfTotalCals)));
    return elfTotalCals;
}
function part2() {
    var elfTotalCals = [];
    var subtotal = 0;
    for (var k = 0; k < rawInput.length; k++) {
        if (rawInput[k] == 0) {
            elfTotalCals.push(subtotal);
            subtotal = 0;
            continue;
        }
        else {
            subtotal += rawInput[k];
        }
    }
    elfTotalCals = elfTotalCals.sort(function (a, b) { return b - a; });
    var answer;
    log("".concat(elfTotalCals[0] + elfTotalCals[1] + elfTotalCals[2]));
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
main(false, true);
