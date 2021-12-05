"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day5input.txt', '\n');
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
function AddPointsToMatrix(matrix, line) {
    var horizontal = line[0][0] == line[1][0];
    var vertical = line[0][1] == line[1][1];
    if (horizontal) {
        var x = line[0][0];
        var y1 = line[0][1];
        var y2 = line[1][1];
        var min = Math.min(y1, y2);
        var max = Math.max(y1, y2);
        for (var c = min; c <= max; c++) {
            matrix[x][c] += 1;
        }
    }
    if (vertical) {
        var y = line[0][1];
        var x1 = line[0][0];
        var x2 = line[1][0];
        var min = Math.min(x1, x2);
        var max = Math.max(x1, x2);
        for (var c = min; c <= max; c++) {
            matrix[c][y] += 1;
        }
    }
    return matrix;
}
function countOverlappingLines(matrix) {
    var count = 0;
    var m_size = matrix.length;
    for (var x = 0; x < m_size; x++) {
        for (var y = 0; y < m_size; y++) {
            if (matrix[x][y] > 1) {
                count++;
            }
        }
    }
    return count;
}
function part1() {
    var endPointList = [];
    for (var p = 0; p < rawInput.length; p++) {
        var line = createEndPoints(rawInput[p]);
        endPointList.push(line);
    }
    log(endPointList[0]);
    var filteredEndPointList = endPointList.filter(function (pair) { return pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]; });
    log("endpoint list length: ".concat(endPointList.length));
    log("filtered length: ".concat(filteredEndPointList.length));
    var m_size = 1000;
    var matrix = generateMatrix(m_size, m_size, 0);
    //console.table(matrix);
    for (var k = 0; k < endPointList.length; k++) {
        var line = endPointList[k];
        matrix = AddPointsToMatrix(matrix, line);
    }
    var count = countOverlappingLines(matrix);
    log("------ THE COUNT ------");
    log("".concat(count));
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
