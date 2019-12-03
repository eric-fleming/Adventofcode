"use strict";
exports.__esModule = true;
var common_1 = require("../shared_functions/common");
var point_1 = require("./point");
// read the input file from the same directory
// first split it into the two paths
// then split each path into a sequence of instructions
function createPaths() {
    var inputArray = common_1.inputToStringArray('day3input.txt', '\n');
    var firstPath = common_1.inputToArray(inputArray[0], 'string', ',');
    var secondPath = common_1.inputToArray(inputArray[1], 'string', ',');
    var paths = {
        first: firstPath,
        second: secondPath
    };
    return paths;
}
exports.createPaths = createPaths;
// print a series of points for logging
// Helped with debugging
function PrintPoints(array, length) {
    for (var p = 0; p < length; p++) {
        console.log("(" + array[p].getX() + ", " + array[p].getY() + ") with len = " + array[p].getLength());
    }
}
exports.PrintPoints = PrintPoints;
// convert instruction into a Point-vector
// you can add points
// each instruction is taken from one of the two paths returned from createPaths()
function parseInstruction(instruction) {
    var dir = instruction[0].toUpperCase();
    var dist = Number(instruction.substring(1));
    if (dir === 'U' || dir === 'D' || dir === 'L' || dir === 'R') {
        return { direction: dir, distance: dist };
    }
    else {
        console.error(dir + " is not a proper direction.");
        return;
    }
}
exports.parseInstruction = parseInstruction;
// Takes the path as an array of strings
// converts each string instruction to a point
// adds the point to the list
function buildPointPath(path) {
    var origin = new point_1.Point(0, 0, 0);
    var pointSequence = [origin];
    for (var p = 0; p < path.length; p++) {
        // grab instruction
        var vector = parseInstruction(path[p]);
        var c = pointSequence.length - 1;
        // adds the instruction to the current point to make next point
        for (var d = 0; d < vector.distance; d++) {
            var nextPoint = void 0;
            var currentPoint = pointSequence[c + d].copy();
            //decide
            if (vector.direction === 'U') {
                var U = new point_1.Point(0, 1, 1);
                nextPoint = currentPoint.add(U);
            }
            else if (vector.direction === 'D') {
                var D = new point_1.Point(0, -1, 1);
                nextPoint = currentPoint.add(D);
            }
            else if (vector.direction === 'R') {
                var R = new point_1.Point(1, 0, 1);
                nextPoint = currentPoint.add(R);
            }
            else if (vector.direction === 'L') {
                var L = new point_1.Point(-1, 0, 1);
                nextPoint = currentPoint.add(L);
            }
            // place nextPoint into list repeatedly
            pointSequence.push(nextPoint);
        }
    }
    return pointSequence;
}
exports.buildPointPath = buildPointPath;
