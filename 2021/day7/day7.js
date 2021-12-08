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
var rawInput = (0, common_1.inputToNumberArray)('day7.input.txt', ',');
console.table(rawInput);
function linearSumationFuelCost(distance) {
    return (distance + 1) * distance / 2;
}
function calculateLinearFuelexpenditure(list, median) {
    var fuelTotal = 0;
    list.forEach(function (posisition) {
        fuelTotal += linearSumationFuelCost(Math.abs(posisition - median));
    });
    return fuelTotal;
}
function calculateFuel(list, median) {
    var fuelTotal = 0;
    list.forEach(function (posisition) {
        fuelTotal += Math.abs(posisition - median);
    });
    return fuelTotal;
}
function part1() {
    var horizontalPositions = __spreadArray([], rawInput, true);
    horizontalPositions = horizontalPositions.sort(function (a, b) { return a - b; });
    var medianIndex = Math.floor(horizontalPositions.length / 2);
    var fuelLeftMedian = calculateFuel(horizontalPositions, horizontalPositions[medianIndex - 1]);
    var fuelRightMedian = calculateFuel(horizontalPositions, horizontalPositions[medianIndex]);
    log("" + Math.min(fuelLeftMedian, fuelRightMedian));
}
function part2() {
    var horizontalPositions = __spreadArray([], rawInput, true);
    horizontalPositions = horizontalPositions.sort(function (a, b) { return a - b; });
    var average = horizontalPositions.reduce(function (a, b) { return a + b; }) / horizontalPositions.length;
    log("the average is " + average);
    var leftAverage = Math.floor(average);
    var rightAverage = Math.ceil(average);
    var leftFuelCost = calculateLinearFuelexpenditure(horizontalPositions, leftAverage);
    var rightFuelCost = calculateLinearFuelexpenditure(horizontalPositions, rightAverage);
    log("" + Math.min(leftFuelCost, rightFuelCost));
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
