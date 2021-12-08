"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day8.input.txt', '\n');
//console.table(rawInput);
function isUniqueLength(size) {
    return size == 2 || size == 3 || size == 4 || size == 7;
}
function part1() {
    var freshInput = __spreadArray([], rawInput, true);
    var inputPairs = [];
    var outputs = [];
    for (var k = 0; k < freshInput.length; k++) {
        var pair = freshInput[k].split(" | ");
        inputPairs[k] = pair;
        outputs[k] = pair[1];
    }
    console.table(outputs);
    var count = 0;
    for (var k = 0; k < outputs.length; k++) {
        var list = outputs[k].split(" ");
        list.forEach(function (item) {
            if (isUniqueLength(item.length)) {
                count++;
            }
        });
    }
    log("".concat(count));
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
        part1();
        log('--------------------------------------');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        part2();
        log('--------------------------------------');
        log('\n\n');
    }
}
main(true, true);
