"use strict";
exports.__esModule = true;
// common methods to be used for multiple days
var fs = require('fs');
function readInput(fileName) {
    var inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}
exports.readInput = readInput;
function stringInputToObject(str, keys, chars) {
    if (keys.length != (chars.length + 1)) {
        console.error('Miss match between key names and spliting characters');
    }
    var obj = {};
    var start = 0;
    for (var n = 0; n < keys.length; n++) {
        var key = keys[n];
        var stop_1 = void 0;
        // for most keys
        if (n < (keys.length - 1)) {
            stop_1 = str.indexOf(chars[n]);
        }
        // for the last key
        else {
            stop_1 = str.length;
        }
        // extract substring, set key value pair
        obj[key] = str.substring(start, stop_1);
        // move the start
        start = stop_1 + 1;
    }
    return obj;
}
exports.stringInputToObject = stringInputToObject;
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
    else {
        console.log(type + " is a not a primitive or Object type.");
        outputArray = [];
    }
    return outputArray;
}
exports.inputToArray = inputToArray;
function inputToNumberArray(fileName, splitChar) {
    var rawFile = readInput(fileName);
    return inputToArray(rawFile, 'number', splitChar);
}
exports.inputToNumberArray = inputToNumberArray;
function inputToStringArray(fileName, splitChar) {
    var rawFile = readInput(fileName);
    return inputToArray(rawFile, 'string', splitChar);
}
exports.inputToStringArray = inputToStringArray;
