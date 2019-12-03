"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var rawInput = common_1.readInput('day3input.txt');
var inputArray = common_1.inputToStringArray('day3input.txt', '\n');
function createPaths(array) {
    var firstPath = common_1.inputToArray(array[0], 'string', ',');
    var secondPath = common_1.inputToArray(array[1], 'string', ',');
    var paths = {
        first: firstPath,
        second: secondPath
    };
    return paths;
}
function firstChallenge() {
    var paths = createPaths(inputArray);
    console.table(paths.first);
    console.table(paths.second);
}
function secondChallenge() { }
firstChallenge();
//secondChallenge();
