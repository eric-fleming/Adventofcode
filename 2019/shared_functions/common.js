"use strict";
exports.__esModule = true;
// common methods to be used for multiple days
var fs = require('fs');
function readInput(fileName) {
    var inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}
exports.readInput = readInput;
function inputToArray(input, type, char) {
    type = type.toLocaleLowerCase();
    var inputArray = input.split(char);
    var outputArray;
    if (type === 'number') {
        outputArray = inputArray.map(function (str) { return Number(str); });
    }
    else if (type === 'string') {
        outputArray = inputArray.map(function (str) { return String(str); });
    }
    return outputArray;
}
exports.inputToArray = inputToArray;
