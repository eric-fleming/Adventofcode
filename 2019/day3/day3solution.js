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
        this.x += vector.x;
        this.y += vector.y;
    };
    Point.prototype.copy = function () {
        var x = this.x;
        var y = this.y;
        return new Point(x, y);
    };
    return Point;
}());
// convert instruction into a Point-vector
// you can add points
function parseInstruction(instruction) {
    var dir = instruction[0].toUpperCase();
    var dist = Number(instruction.substring(1));
    var p;
    if (dir === 'U') {
        p = new Point(0, dist);
    }
    else if (dir === 'D') {
        p = new Point(0, -1 * dist);
    }
    else if (dir === 'L') {
        p = new Point(-1 * dist, 0);
    }
    else if (dir === 'R') {
        p = new Point(dist, 0);
    }
    else {
        console.error(dir + " is not a proper direction.");
        return;
    }
    return p;
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
        var currentPoint = pointSequence[p].copy();
        // adds the instruction to the current point to make next point
        currentPoint.add(vector);
        var nextPoint = currentPoint;
        // place nextPoint into list
        pointSequence.push(nextPoint);
    }
    return pointSequence;
}
function firstChallenge() {
    // get the instructions
    var paths = createPaths(inputArray);
    // console.table(paths.first);
    // console.table(paths.second);
    // Generate sequence of points in each path
    var listOfPoints1 = buildPointPath(paths.first);
    var listOfPoints2 = buildPointPath(paths.second);
    console.log('This is the list of points from path 1');
    console.log('--------------------------------------');
    console.table(listOfPoints1);
    console.log('--------------------------------------');
    var path1Size = paths.first.length;
    var path2Size = paths.second.length;
    var intersection = [];
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
    var distances = intersection.map(function (point) { return Math.abs(point.x) + Math.abs(point.y); });
    console.table(distances.length);
    var min = Math.min.apply(Math, distances);
    console.log("The minimum distance is " + min);
}
function secondChallenge() { }
firstChallenge();
//secondChallenge();
