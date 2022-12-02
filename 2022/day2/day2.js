"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var table = console.table;
var rawInput = (0, common_1.inputToStringArray)('input-day2.txt', '\n');
//console.table(rawInput);
//  A   X   ROCK
//  B   Y   PAPER
//  C   Z   SISSORS
var playMap = new Map();
playMap.set('A X', 3);
playMap.set('A Y', 6);
playMap.set('A Z', 0);
playMap.set('B X', 0);
playMap.set('B Y', 3);
playMap.set('B Z', 6);
playMap.set('C X', 6);
playMap.set('C Y', 0);
playMap.set('C Z', 3);
//  A   ROCK    X   LOSE
//  B   PAPER   Y   DRAW
//  C   SISSORS Z   WIN
var winMap = new Map();
winMap.set('A X', 3);
winMap.set('A Y', 1);
winMap.set('A Z', 2);
winMap.set('B X', 1);
winMap.set('B Y', 2);
winMap.set('B Z', 3);
winMap.set('C X', 2);
winMap.set('C Y', 3);
winMap.set('C Z', 1);
//14224
function part1() {
    //log(rawInput);
    var score = 0;
    for (var k = 0; k < rawInput.length - 1; k++) {
        //log(playMap.get(rawInput[k]))
        score += playMap.get(rawInput[k]);
        if (rawInput[k].indexOf("X") > 0) {
            score += 1;
        }
        else if (rawInput[k].indexOf("Y") > 0) {
            score += 2;
        }
        else if (rawInput[k].indexOf("Z") > 0) {
            score += 3;
        }
    }
    var answer;
    log("total");
    log("".concat(score));
}
function part2() {
    var score = 0;
    for (var k = 0; k < rawInput.length - 1; k++) {
        //log(winMap.get(rawInput[k]))
        score += winMap.get(rawInput[k]);
        if (rawInput[k].indexOf("X") > 0) {
            score += 0;
        }
        else if (rawInput[k].indexOf("Y") > 0) {
            score += 3;
        }
        else if (rawInput[k].indexOf("Z") > 0) {
            score += 6;
        }
    }
    var answer;
    log("total");
    log("".concat(score));
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
