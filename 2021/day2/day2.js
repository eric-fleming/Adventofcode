"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day2input.txt', '\n');
//console.table(rawInput);
function part1() {
    //console.table(rawInput);
    var horizontal = 0;
    var depth = 0;
    for (var i = 0; i < rawInput.length; i++) {
        var arr = rawInput[i].split(" ");
        var dir = arr[0];
        var val = arr[1];
        var amount = parseInt(val);
        if (dir == "down") {
            depth += amount;
        }
        else if (dir == "up") {
            depth -= amount;
        }
        else if (dir == "forward") {
            horizontal += amount;
        }
        else {
            log("ERROR: what is ".concat(dir));
        }
    }
    log("product = ".concat(horizontal * depth));
}
function part2() {
    //console.table(rawInput);
    var horizontal = 0;
    var depth = 0;
    var aim = 0;
    for (var i = 0; i < rawInput.length; i++) {
        var arr = rawInput[i].split(" ");
        var dir = arr[0];
        var val = arr[1];
        var amount = parseInt(val);
        if (dir == "down") {
            aim += amount;
        }
        else if (dir == "up") {
            aim -= amount;
        }
        else if (dir == "forward") {
            horizontal += amount;
            depth += aim * amount;
        }
        else {
            log("ERROR: what is ".concat(dir));
        }
    }
    log("product = ".concat(horizontal * depth));
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
