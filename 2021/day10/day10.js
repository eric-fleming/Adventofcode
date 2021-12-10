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
var table = console.table;
var info = console.info; //(stuff)=>{}
// day10.input.txt
// ex.10.txt
var rawInput = (0, common_1.inputToStringArray)('day10.input.txt', '\n');
//console.table(rawInput);
var illegalPointsMap = new Map();
illegalPointsMap.set(')', 3);
illegalPointsMap.set(']', 57);
illegalPointsMap.set('}', 1197);
illegalPointsMap.set('>', 25137);
var PAIRS = ['()', '[]', '{}', '<>'];
var OPENCHARS = PAIRS.map(function (item) { return item[0]; });
var CLOSECHARS = PAIRS.map(function (item) { return item[1]; });
//table(PAIRS);
//table(OPENCHARS);
//table(CLOSECHARS);
function validPair(open, close) {
    return PAIRS.includes(open + close);
}
function openTally(char) {
    return OPENCHARS.includes(char) ? true : false;
}
function closeTally(char) {
    return CLOSECHARS.includes(char) ? true : false;
}
function test() {
    log(validPair('(', ')'));
    log(!validPair('(', '}'));
    log(validPair('[', ']'));
    log(!validPair('<', ')'));
}
//test();
function part1() {
    var lines = __spreadArray([], rawInput, true);
    var errors = [];
    for (var k = 0; k < lines.length; k++) {
        var line = lines[k];
        log(line);
        var opens = [];
        inner: for (var c = 0; c < line.length; c++) {
            var char = line[c];
            //log(char);
            if (openTally(char)) {
                opens.push(char);
                continue;
                //log(opens)
            }
            if (closeTally(char)) {
                if (!validPair(opens[opens.length - 1], char)) {
                    log("BAD PAIR\t ".concat(opens[opens.length - 1]).concat(char));
                    log("AT INDEX\t ".concat(c - 1, ",").concat(c));
                    errors.push(char);
                    break inner;
                }
                else {
                    opens.pop();
                }
            }
        }
    }
    console.table(errors);
    var total = 0;
    errors.forEach(function (err) { total += illegalPointsMap.get(err); });
    //console.table(errors);
    log("".concat(total));
}
//     > {[]{[(<()>
//open : {([(<[}
//close:
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
