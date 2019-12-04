"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var calculation = function (fuel) {
    if (fuel > 0) {
        return Math.floor(fuel / 3) - 2;
    }
    else {
        // The last character in list === 0 which means EOL but needs to stay 0 to not affect the sum
        return 0;
    }
};
var sum = function (a, b) { return a + b; };
function FuelRequired(fuelModules) {
    fuelModules = fuelModules.map(calculation);
    var totalFuel = fuelModules.reduce(sum, 0);
    return totalFuel;
}
function firstChallenge() {
    var inputNumberArray = common_1.inputToArray(common_1.readInput('day1input.txt'), 'number', '\n');
    var total = FuelRequired(inputNumberArray);
    console.log("The total amount of fuel is : " + total);
}
function secondChallenge() {
    var inputNumberArray = common_1.inputToArray(common_1.readInput('day1input.txt'), 'number', '\n');
    var fuelInception = [];
    var fuelModuletotal = 0;
    for (var f = 0; f < inputNumberArray.length; f++) {
        var tempFuel = inputNumberArray[f];
        fuelInception[f] = 0;
        while (tempFuel >= 6) {
            tempFuel = calculation(tempFuel);
            fuelInception[f] += tempFuel;
            //console.log('put in : '+tempFuel);
        }
        //console.log('------ next fuel module -------');
    }
    fuelModuletotal = fuelInception.reduce(sum, 0);
    console.log("The Recursive Fuel Total is : " + fuelModuletotal);
}
firstChallenge();
secondChallenge();
