"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("./common");
var rawInput = common_1.readInput('testinput.txt');
var data = common_1.inputToStringArray('testinput.txt', '\n');
function test() {
    var dataObjects = [];
    for (var d = 0; d < data.length; d++) {
        var str = data[d];
        var obj = common_1.stringInputToObject(str, ['index', 'quantity', 'dimension'], ['@', ':']);
        dataObjects.push(obj);
    }
    console.table(dataObjects);
}
test();
