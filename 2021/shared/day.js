"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var boxen_1 = require("boxen");
var log = console.log;
//const rawInput = readInput('day3input.txt');
function firstChallenge() { }
function secondChallenge() { }
// print setting
var greeting = chalk_1["default"].white.bold("Merry Christmas!!");
var boxenOptions = {
    padding: 1,
    margin: 1
};
var msgBox = (0, boxen_1["default"])(greeting, boxenOptions);
console.log(msgBox);
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
main(true, false);
