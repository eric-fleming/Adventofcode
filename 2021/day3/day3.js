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
var rawInput = (0, common_1.inputToStringArray)('day3input.txt', '\n');
console.table(rawInput);
function calcGammaRate(binary) {
    var digits = binary[0].length;
    var len = binary.length;
    var gamma = '';
    for (var digit = 0; digit < digits; digit++) {
        var ones = 0;
        var zeros = 0;
        for (var index = 0; index < len; index++) {
            if (binary[index][digit] === "1") {
                ones++;
            }
            else if (binary[index][digit] == "0") {
                zeros++;
            }
        }
        if (ones > zeros) {
            gamma += "1";
        }
        else if (zeros > ones) {
            gamma += "0";
        }
        else if (ones == zeros) {
            gamma += "D";
        }
    }
    return gamma;
}
function calcEpsilonRate(binary) {
    var gammaRate = calcGammaRate(binary);
    var epsilon = '';
    for (var d = 0; d < gammaRate.length; d++) {
        if (gammaRate[d] == '1') {
            epsilon += '0';
        }
        else if (gammaRate[d] == '0') {
            epsilon += '1';
        }
        else {
            epsilon += "D";
        }
    }
    return epsilon;
}
function part1() {
    var gammaRate = calcGammaRate(rawInput);
    var epsilonRate = calcEpsilonRate(rawInput);
    log("gamma rate: ".concat(gammaRate));
    log("epsilon rate: ".concat(epsilonRate));
    var product = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
    // answer
    log("power consumption = ".concat(product));
}
function mostCommonBit(binary, digit) {
    var gamma = calcGammaRate(binary);
    //log(gamma)
    var bit = gamma[digit];
    if (bit == "D") {
        return "1";
    }
    return gamma[digit];
}
function selectWinners(binary, digit, mode) {
    var winners = [];
    for (var k = 0; k < binary.length; k++) {
        if (binary[k][digit] == mode) {
            winners.push(binary[k]);
        }
    }
    return winners;
}
function calcOxygenRating(binary) {
    var len = binary.length;
    var digits = binary[0].length;
    var winners = __spreadArray([], binary, true);
    for (var digit = 0; digit < digits; digit++) {
        var mostCommon = mostCommonBit(winners, digit);
        //log(`most common bit\t digit=${digit}\t bit=${mostCommon}`);
        winners = selectWinners(winners, digit, mostCommon);
        //log(winners)
        if (winners.length == 1) {
            return winners[0];
        }
    }
    return 'nope';
}
function leastCommonBit(binary, digit) {
    var epsilon = calcEpsilonRate(binary);
    //console.log(epsilon)
    var bit = epsilon[digit];
    if (bit == "D") {
        return "0";
    }
    return epsilon[digit];
}
function calcCarbonRating(binary) {
    var len = binary.length;
    var digits = binary[0].length;
    var winners = __spreadArray([], binary, true);
    for (var digit = 0; digit < digits; digit++) {
        var leastCommon = leastCommonBit(winners, digit);
        //log(`least common bit\t digit=${digit}\t bit=${leastCommon}`);
        winners = selectWinners(winners, digit, leastCommon);
        //log(winners)
        if (winners.length == 1) {
            return winners[0];
        }
    }
    return 'nope';
}
function part2() {
    var oxygenRating = calcOxygenRating(rawInput);
    var carbonRating = calcCarbonRating(rawInput);
    log("".concat(oxygenRating, " == ").concat(parseInt(oxygenRating, 2)));
    log("".concat(carbonRating, " == ").concat(parseInt(carbonRating, 2)));
    var life = parseInt(oxygenRating, 2) * parseInt(carbonRating, 2);
    // answer
    log("Life support Rating = ".concat(life));
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
