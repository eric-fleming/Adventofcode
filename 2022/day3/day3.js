"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var table = console.table;
var rawInput = (0, common_1.inputToStringArray)('input-day3.txt', '\n');
table(rawInput);
function priorityScore(letter) {
    var charCode = letter.charCodeAt(0);
    if (charCode >= 97 && charCode <= 122) {
        return charCode - 96;
    }
    else if (charCode >= 65 && charCode <= 90) {
        return charCode - 38;
    }
    return 0;
}
function part1() {
    var rucksacks = [];
    for (var k = 0; k < rawInput.length; k++) {
        var sack = rawInput[k];
        var len = sack.length;
        var parts = [
            sack.substring(0, len / 2),
            sack.substring(len / 2, len)
        ];
        //log(parts[0].length == parts[1].length);
        rucksacks.push(parts);
    }
    table(rucksacks);
    var overlaps = [];
    for (var k = 0; k < rucksacks.length; k++) {
        var part1_1 = rucksacks[k][0];
        var part2_1 = rucksacks[k][1];
        var size = part1_1.length;
        for (var c = 0; c < size; c++) {
            var char = part1_1[c];
            if (part2_1.indexOf(char) >= 0) {
                overlaps.push(char);
                break;
            }
        }
    }
    var scores = overlaps.map(function (c) { return priorityScore(c); });
    var sum = 0;
    for (var d = 0; d < scores.length; d++) {
        sum += scores[d];
    }
    //table(overlaps);
    //table(scores);
    log('scores.length = ' + scores.length);
    log("".concat(sum));
}
function commonLetter(parts) {
    var part1 = parts[0];
    var part2 = parts[1];
    var part3 = parts[2];
    var overlaps = [];
    for (var c = 0; c < part1.length; c++) {
        var char = part1[c];
        if (part2.indexOf(char) >= 0) {
            overlaps.push(char);
        }
    }
    var overlap;
    for (var c = 0; c < overlaps.length; c++) {
        var char = overlaps[c];
        if (part3.indexOf(char) >= 0) {
            overlap = char;
            break;
        }
    }
    return overlap;
}
function part2() {
    var rucksacks = [];
    for (var k = 0; k < rawInput.length; k = k + 3) {
        var sack = [rawInput[k], rawInput[k + 1], rawInput[k + 2]];
        rucksacks.push(sack);
    }
    table(rucksacks);
    var overlaps = [];
    for (var k = 0; k < rucksacks.length; k++) {
        log(rucksacks[k].length == 3);
        overlaps.push(commonLetter(rucksacks[k]));
    }
    table(overlaps);
    var scores = overlaps.map(function (c) { return priorityScore(c); });
    var sum = 0;
    for (var d = 0; d < scores.length; d++) {
        sum += scores[d];
    }
    //table(overlaps);
    //table(scores);
    log('scores.length = ' + scores.length);
    log("".concat(sum));
}
// main method to run the program
function main(first, second) {
    if (first) {
        log('######################################');
        log('----------  First Challenge ----------');
        log('######################################');
        part1();
        log('\n\n');
    }
    if (second) {
        log('######################################');
        log('----------  Second Challenge ---------');
        log('######################################');
        part2();
        log('\n\n');
    }
}
main(false, true);
