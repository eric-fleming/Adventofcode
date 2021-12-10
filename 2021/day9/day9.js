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
//console.table(rawInput);
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
    var matrix = new Array(rows);
    for (var k = 0; k < rows; k++) {
        matrix[k] = list[k].split('');
    }
    return matrix;
}
function isLowestPoint(matrix, x, y) {
    var point = matrix[y][x];
    var topleft = matrix[y - 1][x - 1];
    var topmiddle = matrix[y - 1][x];
    var topright = matrix[y - 1][x + 1];
    var top = point < topleft && point < topmiddle && point < topright;
    var left = matrix[y][x - 1];
    var right = matrix[y][x + 1];
    var sides = point < left && point < right;
    var bottomleft = matrix[y + 1][x - 1];
    var bottommiddle = matrix[y + 1][x];
    var bottomright = matrix[y + 1][x + 1];
    var bottom = point < bottomleft && point < bottommiddle && point < bottomright;
    return top && sides && bottom;
}
function part1() {
    var paddedList = padInput(__spreadArray([], rawInput, true), 'A');
    var matrix = convertToMatrix(paddedList);
    var lowPointScores = [];
    for (var r = 1; r < matrix.length - 1; r++) {
        for (var c = 1; c < matrix[0].length - 1; c++) {
            if (isLowestPoint(matrix, c, r)) {
                lowPointScores.push(Number(matrix[r][c]) + 1);
            }
        }
    }
    var total = lowPointScores.reduce(function (a, b) { return a + b; });
    log("total score: ".concat(total));
}
function lowPointCoordinates() {
    var paddedList = padInput(__spreadArray([], rawInput, true), 'A');
    var matrix = convertToMatrix(paddedList);
    var lowPointCoordinates = [];
    for (var r = 1; r < matrix.length - 1; r++) {
        for (var c = 1; c < matrix[0].length - 1; c++) {
            if (isLowestPoint(matrix, c, r)) {
                lowPointCoordinates.push({ x: c, y: r });
            }
        }
    }
    return lowPointCoordinates;
}
function createVisitedMatrix(list) {
    var visited = [];
    var cols = list[0].length;
    visited.push(new Array(cols + 2).fill(1));
    list.forEach(function (line) {
        var row = new Array(cols + 2).fill(0);
        row[0] = 1;
        row[cols + 1] = 1;
        visited.push(row);
    });
    visited.push(new Array(cols + 2).fill(1));
    return visited;
}
function edgeOfBasin(value) {
    return value == '9' || value == 'A';
}
function traverse(x, y, matrix, visited) {
    if (visited[y][x] == 1) {
        return 0;
    }
    if (x == 0 || y == 0 || (y == matrix.length - 1) || (x == matrix[0].length - 1)) {
        return 0;
    }
    if (edgeOfBasin(matrix[y][x])) {
        return 0;
    }
    visited[y][x] = 1;
    var sum = 1;
    if (visited[y][x - 1] == 0) {
        sum += traverse(x - 1, y, matrix, visited);
    }
    if (visited[y][x + 1] == 0) {
        sum += traverse(x + 1, y, matrix, visited);
    }
    if (visited[y - 1][x] == 0) {
        sum += traverse(x, y - 1, matrix, visited);
    }
    if (visited[y + 1][x] == 0) {
        sum += traverse(x, y + 1, matrix, visited);
    }
    return sum;
}
function part2() {
    var paddedList = padInput(__spreadArray([], rawInput, true), 'A');
    var matrix = convertToMatrix(paddedList);
    var visited = createVisitedMatrix(__spreadArray([], rawInput, true));
    //get the coordinates of basins
    var startingCoordinates = lowPointCoordinates();
    var basinSizes = [];
    // loop through starting points
    // tranverse in 4 directions
    // append to results array
    startingCoordinates.forEach(function (point) {
        var size = traverse(point.x, point.y, matrix, visited);
        basinSizes.push(size);
    });
    // sort
    // multiply the top 3
    basinSizes.sort(function (a, b) { return a - b; });
    var len = basinSizes.length;
    var product;
    if (len >= 3) {
        product = basinSizes[len - 1] * basinSizes[len - 2] * basinSizes[len - 3];
    }
    else {
        product = null;
    }
    log("product = ".concat(product));
}
// main method to run the program
function main(first, second) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        log('--------------------------------------');
        part1();
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        log('--------------------------------------');
        part2();
        log('\n\n');
    }
}
main(true, true);
