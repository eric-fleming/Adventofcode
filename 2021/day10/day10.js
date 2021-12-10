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
var rawInput = (0, common_1.inputToStringArray)('ex.10.txt', '\n');
//console.table(rawInput);
var illegalPointsMap = new Map();
illegalPointsMap.set(')', 3);
illegalPointsMap.set(']', 57);
illegalPointsMap.set('}', 1197);
illegalPointsMap.set('>', 25137);
var PAIRS = ['()', '[]', '{}', '<>'];
var OPENCHARS = PAIRS.map(function (item) { return item[0]; });
var CLOSECHARS = PAIRS.map(function (item) { return item[1]; });
function validPair(open, close) {
    return PAIRS.includes(open + close);
}
function openTally(char) {
    return OPENCHARS.includes(char) ? true : false;
}
function closeTally(char) {
    return CLOSECHARS.includes(char) ? true : false;
}
function part1() {
    var lines = __spreadArray([], rawInput, true);
    var errors = [];
    for (var k = 0; k < lines.length; k++) {
        var line = lines[k];
        var opens = [];
        inner: for (var c = 0; c < line.length; c++) {
            var char = line[c];
            if (openTally(char)) {
                opens.push(char);
                continue;
            }
            if (closeTally(char)) {
                if (!validPair(opens[opens.length - 1], char)) {
                    //log(`BAD PAIR\t ${opens[opens.length-1]}${char}`);
                    //log(`AT INDEX\t ${c-1},${c}`);
                    errors.push(char);
                    break inner;
                }
                else {
                    opens.pop();
                }
            }
        }
    }
    //console.table(errors);
    var total = 0;
    errors.forEach(function (err) { total += illegalPointsMap.get(err); });
    //console.table(errors);
    log("".concat(total));
}
var autoCompletePointsMap = new Map();
autoCompletePointsMap.set(')', 1);
autoCompletePointsMap.set(']', 2);
autoCompletePointsMap.set('}', 3);
autoCompletePointsMap.set('>', 4);
function autoPointTotal(remaining) {
    var total = 0;
    for (var k = 0; k < remaining.length; k++) {
        var subtotal = (total * 5 + autoCompletePointsMap.get(remaining[k]));
        total = subtotal;
    }
    return total;
}
function part2() {
    var lines = __spreadArray([], rawInput, true);
    var incompletes = [];
    for (var k = 0; k < lines.length; k++) {
        var line = lines[k];
        var opens = [];
        var incomplete = true;
        inner: for (var c = 0; c < line.length; c++) {
            var char = line[c];
            if (openTally(char)) {
                opens.push(char);
                continue;
            }
            if (closeTally(char)) {
                if (!validPair(opens[opens.length - 1], char)) {
                    incomplete = false;
                    break inner;
                }
                else {
                    opens.pop();
                }
            }
        }
        if (incomplete) {
            incompletes.push({
                line: lines[k],
                remaining: opens
            });
        }
    }
    table(incompletes);
    var beginnings = incompletes.map(function (item) { return item.remaining; });
    //table(beginnings);
    var endings = beginnings.map(function (list) {
        var flipped = list.map(function (item) { return CLOSECHARS[OPENCHARS.indexOf(item)]; });
        flipped.reverse();
        return flipped;
    });
    table(endings);
    var scores = endings.map(function (list) { return autoPointTotal(list); });
    scores.sort(function (a, b) { return a - b; });
    log('scores');
    table(scores);
    log(scores[Math.floor(scores.length / 2)]);
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
