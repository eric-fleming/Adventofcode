"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day5input.txt', '\r\n');
console.table(rawInput);
function createEndPoint(pointString) {
    pointString = pointString.trim();
    var vals = pointString.split(",");
    vals[0] = parseInt(vals[0]);
    vals[1] = parseInt(vals[1]);
    return vals;
}
function createEndPoints(list) {
    var pair = list.split(" -> ");
    var A = pair[0];
    A = createEndPoint(A);
    //log(A);
    var B = pair[1];
    B = createEndPoint(B);
    //log(B);
    return [A, B];
}
function generateMatrix(rows, cols, value) {
    var matrix = [];
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}
function part1() {
    var endPointList = [];
    for (var p = 0; p < rawInput.length; p++) {
        var line = createEndPoints(rawInput[p]);
        endPointList.push(line);
    }
    log(endPointList[0]);
    var filteredEndPointList = endPointList.filter(function (pair) { return pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]; });
    log("endpoint list length: " + endPointList.length);
    log("filtered length: " + filteredEndPointList.length);
    var matrix = generateMatrix(5, 5, 0);
    console.table(matrix);
    var answer;
    log("" + answer);
}
function part2() {
    var answer;
    log("" + answer);
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
