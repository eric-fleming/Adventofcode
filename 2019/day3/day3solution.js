"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var path_1 = require("./path");
function firstChallenge() {
    // get the instructions
    var paths = path_1.createPaths();
    // Generate sequence of points in each path
    var listOfPoints1 = path_1.buildPointPath(paths.first);
    var listOfPoints2 = path_1.buildPointPath(paths.second);
    var intersection = [];
    // I start at 1's because we dont want the origin.
    for (var a = 1; a < listOfPoints1.length; a++) {
        for (var b = 1; b < listOfPoints2.length; b++) {
            if (listOfPoints1[a].equals(listOfPoints2[b])) {
                var p = listOfPoints1[a];
                //console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
                intersection.push(listOfPoints1[a]);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log("Number of Intersectios : " + intersection.length);
    var distances = intersection.map(function (point) { return Math.abs(point.getX()) + Math.abs(point.getY()); });
    var min = Math.min.apply(Math, distances);
    console.log("The minimum distance is " + min);
}
function secondChallenge() {
    // get the instructions
    var paths = path_1.createPaths();
    // Generate sequence of points in each path
    var listOfPoints1 = path_1.buildPointPath(paths.first);
    var listOfPoints2 = path_1.buildPointPath(paths.second);
    var intersectionPairs = [];
    // I start at 1's because we dont want the origin.
    for (var a = 1; a < listOfPoints1.length; a++) {
        for (var b = 1; b < listOfPoints2.length; b++) {
            if (listOfPoints1[a].equals(listOfPoints2[b])) {
                var p = listOfPoints1[a];
                var pair = [listOfPoints1[a].getLength(), listOfPoints2[b].getLength()];
                //console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
                intersectionPairs.push(pair);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log("Number of Intersectios : " + intersectionPairs.length);
    var intersctionTotalLengths = intersectionPairs.map(function (pair) { return pair[0] + pair[1]; });
    var min = Math.min.apply(Math, intersctionTotalLengths);
    console.log("The minimum length of both wires combined is " + min); // */
}
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge();
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, true);
