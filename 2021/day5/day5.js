"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day5input.txt', '\n');
var SIZE = 1000;
//console.table(rawInput);
function createEndPoint(point) {
    point = point.trim();
    var vals = point.split(",").map(function (val) { return parseInt(val); });
    return vals;
}
function createEndPointPair(inputLine) {
    var pair = inputLine.split(" -> ").map(function (point) { return createEndPoint(point); });
    return pair;
}
function generateMatrix(rows, cols, value) {
    var matrix = [];
    for (var r = 0; r < rows; r++) {
        var row = new Array(cols);
        row.fill(value);
        matrix[r] = row;
    }
    return matrix;
}
function createSquareMatrix(size, defaultVal) {
    var matrix = new Array(size);
    for (var r = 0; r < size; r++) {
        var row = new Array(size);
        row.fill(defaultVal);
        matrix[r] = row;
    }
    return matrix;
}
function AddPointsToMatrix(matrix, line) {
    var x1 = line[0][0];
    var x2 = line[1][0];
    var y1 = line[0][1];
    var y2 = line[1][1];
    var Xmin = Math.min(x1, x2);
    var Xmax = Math.max(x1, x2);
    var Ymin = Math.min(y1, y2);
    var Ymax = Math.max(y1, y2);
    var horizontal = line[0][0] == line[1][0];
    var vertical = line[0][1] == line[1][1];
    if (horizontal) {
        var x = line[0][0];
        for (var c = Ymin; c <= Ymax; c++) {
            matrix[x][c] += 1;
        }
        return matrix;
    }
    else if (vertical) {
        var y = line[0][1];
        for (var c = Xmin; c <= Xmax; c++) {
            matrix[c][y] += 1;
        }
        return matrix;
    }
    // part 2
    var slope = ((y2 - y1) / (x2 - x1));
    var steps = Xmax - Xmin;
    if (slope == 1) {
        for (var p = 0; p <= steps; p++) {
            matrix[Xmin + p][Ymin + p] += 1;
        }
        return matrix;
    }
    else if (slope == -1) {
        for (var p = 0; p <= steps; p++) {
            matrix[Xmin + p][Ymax - p] += 1;
        }
        return matrix;
    }
    log('Line did not conform to any plan');
    return matrix;
}
function countOverlappingLines(matrix) {
    var count = 0;
    var size = matrix.length;
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
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
        var line = createEndPointPair(rawInput[p]);
        endPointList.push(line);
    }
    var filteredEndPointList = endPointList.filter(function (pair) { return pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]; });
    var matrix = generateMatrix(SIZE, SIZE, 0);
    for (var k = 0; k < filteredEndPointList.length; k++) {
        var line = filteredEndPointList[k];
        matrix = AddPointsToMatrix(matrix, line);
    }
    log("------ THE COUNT ------");
    log("".concat(countOverlappingLines(matrix)));
}
function part2() {
    var endPointList = [];
    for (var p = 0; p < rawInput.length; p++) {
        var line = createEndPointPair(rawInput[p]);
        endPointList.push(line);
    }
    var matrix = createSquareMatrix(SIZE, 0);
    for (var k = 0; k < endPointList.length; k++) {
        var line = endPointList[k];
        matrix = AddPointsToMatrix(matrix, line);
    }
    log("------ THE COUNT ------");
    log("".concat(countOverlappingLines(matrix)));
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
