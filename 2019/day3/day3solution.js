"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var rawInput = common_1.readInput('day3input.txt');
var inputArray = common_1.inputToStringArray('day3input.txt', '\n');
function createPaths(array) {
    var firstPath = common_1.inputToArray(array[0], 'string', ',');
    var secondPath = common_1.inputToArray(array[1], 'string', ',');
    var paths = {
        first: firstPath,
        second: secondPath
    };
    return paths;
}
// function to construct point objects with 'new'
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.equals = function (other) {
        return ((this.x === other.x) && (this.y === other.y));
    };
    Point.prototype.add = function (vector) {
        var nextx = this.x + vector.x;
        var nexty = this.y + vector.y;
        return new Point(nextx, nexty);
    };
    Point.prototype.copy = function () {
        var x = this.x;
        var y = this.y;
        return new Point(x, y);
    };
    return Point;
}());
// print a series of points for logging
function PrintPoints(array, length) {
    for (var p = 0; p < length; p++) {
        console.log("(" + array[p].x + ", " + array[p].y + ")");
    }
}
// convert instruction into a Point-vector
// you can add points
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
// Takes the path as an array of strings
// converts each string instruction to a point
// adds the point to the list
function buildPointPath(path) {
    var origin = new Point(0, 0);
    var pointSequence = [origin];
    for (var p = 0; p < path.length; p++) {
        // grab instruction
        var vector = parseInstruction(path[p]);
        var c = pointSequence.length - 1;
        var currentPoint = pointSequence[c].copy();
        // adds the instruction to the current point to make next point
        for (var d = 0; d < vector.distance; d++) {
            var nextPoint = void 0;
            currentPoint = pointSequence[c + d].copy();
            if (vector.direction === 'U') {
                var U = new Point(0, 1);
                nextPoint = currentPoint.add(U);
            }
            else if (vector.direction === 'D') {
                var D = new Point(0, -1);
                nextPoint = currentPoint.add(D);
            }
            else if (vector.direction === 'R') {
                var R = new Point(1, 0);
                nextPoint = currentPoint.add(R);
            }
            else if (vector.direction === 'L') {
                var L = new Point(-1, 0);
                nextPoint = currentPoint.add(L);
            }
            // place nextPoint into list repeatedly
            pointSequence.push(nextPoint);
        }
    }
    return pointSequence;
}
function firstChallenge() {
    // get the instructions
    var paths = createPaths(inputArray);
    // console.table(paths.first);
    // console.table(paths.second);
    // Generate sequence of points in each path
    console.log("length of instructions 1: " + paths.first.length);
    console.log("length of instructions 2: " + paths.second.length);
    var listOfPoints1 = buildPointPath(paths.first);
    var listOfPoints2 = buildPointPath(paths.second);
    console.log("length of list 1: " + listOfPoints1.length);
    console.log("length of list 2: " + listOfPoints2.length);
    /**
    console.log('------ printing test points ------');
    PrintPoints(listOfPoints1,10);
    console.log('------ printing test points ------');
    PrintPoints(listOfPoints2,10);
    /***/
    var path1Size = listOfPoints1.length;
    var path2Size = listOfPoints2.length;
    var intersection = [];
    /** */
    // I start at 1's because we dont want the origin.
    for (var a = 1; a < path1Size; a++) {
        for (var b = 1; b < path2Size; b++) {
            if (listOfPoints1[a].equals(listOfPoints2[b])) {
                var p = listOfPoints1[a];
                console.log("Found a point of intersection : (" + p.x + ", " + p.y + ")");
                intersection.push(listOfPoints1[a]);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log("Number of Intersectios : " + intersection.length);
    var distances = intersection.map(function (point) { return Math.abs(point.x) + Math.abs(point.y); });
    console.table(distances.length);
    var min = Math.min.apply(Math, distances);
    console.log("The minimum distance is " + min); // */
}
function secondChallenge() { }
firstChallenge();
//secondChallenge();
