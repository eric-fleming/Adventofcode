"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var rawInput = common_1.readInput('day10input.txt');
var asteroidArray = common_1.inputToArray(rawInput, 'string', '\n');
var asteroidMultiArray = common_1.inputToMultiStringArray('day10input.txt', '\n');
//console.table(asteroidArray);
//console.table(asteroidMultiArray);
// so you will get a read type error if you land out of bounds
function localAsteroidCount(multiArray, asteroidChar) {
    var width = multiArray[0].length;
    var height = multiArray.length;
    var asteroidCount = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            if (multiArray[x][y] === asteroidChar) {
                asteroidCount++;
            }
        }
    }
    return asteroidCount;
}
function firstChallenge() {
    var width = asteroidMultiArray[0].length;
    var height = asteroidMultiArray.length;
    console.log("There are " + localAsteroidCount(asteroidMultiArray, '#') + " in this local region.");
}
function secondChallenge() { }
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
