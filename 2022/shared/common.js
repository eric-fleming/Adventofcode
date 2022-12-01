"use strict";
exports.__esModule = true;
exports.getAllIndexes = exports.inputToMultiStringArray = exports.inputToStringArray = exports.inputToNumberArray = exports.inputToArray = exports.stringArrayToObjectArray = exports.stringInputToObject = exports.readInput = void 0;
// common methods to be used for multiple days
var fs = require('fs');
// reads the text file as one giant string
function readInput(fileName) {
    var inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}
exports.readInput = readInput;
// takes a formatted string
// with the corresponding array of object keys
// and the list of character delimeters for each key
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
        obj[key] = str.substring(start, stop_1).trim();
        // move the start
        start = stop_1 + 1;
    }
    return obj;
}
exports.stringInputToObject = stringInputToObject;
// takes an array of formatted strings
// with the corresponding array of object keys
// and the list of character delimeters for each key
function stringArrayToObjectArray(stringArray, keys, chars) {
    var dataObjects = [];
    for (var d = 0; d < stringArray.length; d++) {
        var str = stringArray[d];
        var obj = stringInputToObject(str, keys, chars);
        dataObjects.push(obj);
    }
    return dataObjects;
}
exports.stringArrayToObjectArray = stringArrayToObjectArray;
// meant to split a text file with only one type of delimeter
// ideal for successive input of state changes
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
        console.log("".concat(type, " is a not a primitive or Object type."));
        outputArray = [];
    }
    return outputArray;
}
exports.inputToArray = inputToArray;
// composed version of readFile and inputToArray
// convert contents to numbers
function inputToNumberArray(fileName, splitChar) {
    var rawFile = readInput(fileName);
    return inputToArray(rawFile, 'number', splitChar);
}
exports.inputToNumberArray = inputToNumberArray;
// composed version of readFile and inputToArray
// leave contents as strings
function inputToStringArray(fileName, splitChar) {
    var rawFile = readInput(fileName);
    return inputToArray(rawFile, 'string', splitChar);
}
exports.inputToStringArray = inputToStringArray;
function inputToMultiStringArray(fileName, rowSplitChar) {
    var splitIntoRows = inputToStringArray(fileName, rowSplitChar);
    var multiArray = [];
    for (var i = 0; i < splitIntoRows.length - 1; i++) {
        var rowString = splitIntoRows[i];
        var currentRow = [];
        for (var j = 0; j < splitIntoRows[0].length; j++) {
            if (rowString === undefined || rowString === '' || rowString === '\n' || rowString === '\r\n') {
                continue;
            }
            else {
                var char = rowString.substring(j, j + 1);
                currentRow.push(char);
            }
        }
        multiArray.push(currentRow);
    }
    return multiArray;
}
exports.inputToMultiStringArray = inputToMultiStringArray;
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}
exports.getAllIndexes = getAllIndexes;
