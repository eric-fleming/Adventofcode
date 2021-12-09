"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day9.input.txt', '\n');
console.table(rawInput);
function padInput(list, padChar) {
    var paddedList = [];
    var cols = list[0].length;
    paddedList.push('A'.repeat(cols + 2));
    list.forEach(function (line) { return paddedList.push(padChar + line + padChar); });
    paddedList.push('A'.repeat(cols + 2));
    return paddedList;
}
function convertToMatrix(list) {
    var rows = list.length;
    //let cols = list[0].length;
    var matrix = new Array(rows);
    for (var k = 0; k < rows; k++) {
        matrix[k] = list[k].split('');
    }
    return matrix;
}
function isLowerThanAbove(matrix, x, y) {
    var point = matrix[y][x];
    var topleft = matrix[y - 1][x - 1];
    var topmiddle = matrix[y - 1][x];
    var topright = matrix[y - 1][x + 1];
    return point < topleft && point < topmiddle && point < topright;
}
function isLowerThanSides(matrix, x, y) {
    var point = matrix[y][x];
    var left = matrix[y][x - 1];
    var right = matrix[y][x + 1];
    return point < left && point < right;
}
function isLowerThanBelow(matrix, x, y) {
    var point = matrix[y][x];
    var bottomleft = matrix[y + 1][x - 1];
    var bottommiddle = matrix[y + 1][x];
    var bottomright = matrix[y + 1][x + 1];
    return point < bottomleft && point < bottommiddle && point < bottomright;
}
function isLowestPoint(matrix, x, y) {
    return isLowerThanAbove(matrix, x, y) && isLowerThanSides(matrix, x, y) && isLowerThanBelow(matrix, x, y);
}
function part1() {
    var paddedList = padInput(__spreadArray([], rawInput, true), 'A');
    //console.table(paddedList);
    var matrix = convertToMatrix(paddedList);
    //console.table(matrix);
    var rows = matrix.length;
    var cols = matrix[0].length;
    var lowPointScores = [];
    for (var r = 1; r < rows - 1; r++) {
        for (var c = 1; c < cols - 1; c++) {
            if (isLowestPoint(matrix, c, r)) {
                lowPointScores.push(Number(matrix[r][c]) + 1);
            }
        }
    }
    log(lowPointScores);
    var total = lowPointScores.reduce(function (a, b) { return a + b; });
    log("total score: ".concat(total));
}
function part2() {
    var answer;
    log("".concat(answer));
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
