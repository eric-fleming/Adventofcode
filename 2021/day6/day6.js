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
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToNumberArray)('day6.input.txt', ',');
function processFishEachDay(fishArray) {
    var newfish = [];
    for (var f = 0; f < fishArray.length; f++) {
        if (fishArray[f] == 0) {
            fishArray[f] = 6;
            newfish.push(8);
        }
        else {
            fishArray[f] -= 1;
        }
    }
    fishArray = __spreadArray(__spreadArray([], fishArray, true), newfish, true);
    return fishArray;
}
function part1(days) {
    log("After ".concat(days, " days..."));
    var fishes = __spreadArray([], rawInput, true);
    while (days > 0) {
        fishes = processFishEachDay(fishes);
        days--;
    }
    log("Fish population is ".concat(fishes.length));
}
function cacheBuilder(days, val) {
    if (days == 0) {
        return 1;
    }
    var fishes = [val];
    //log('started while')
    while (days > 0) {
        fishes = processFishEachDay(fishes);
        days--;
    }
    return fishes.length;
}
function fishArray(day, val) {
    return [day, val];
}
function dynamicTable(dayLimit) {
    var table = new Map();
    var counter = 0;
    for (var day = dayLimit; day > 0; day--) {
        for (var val = 8; val >= 0; val--) {
            var sub_population = cacheBuilder(day, val);
            table.set(fishArray(day, val).toString(), sub_population);
            counter++;
        }
    }
    return table;
}
function decomposeStart() {
    var fishes = rawInput;
    var starts = new Map();
    for (var k = 0; k < fishes.length; k++) {
        var fish = fishes[k];
        if (starts.has(fish)) {
            var mapVal = starts.get(fish);
            starts.set(fish, mapVal + 1);
        }
        else {
            starts.set(fish, 1);
        }
    }
    return starts;
}
function singleFishContribution(days, cache, input) {
    var fishes = input; //rawInput [3, 4, 3, 1, 2]
    var population = 0;
    while (days > 0) {
        //scan for fish in cache
        //move fish to new array
        var remainingFish = [];
        for (var k = 0; k < fishes.length; k++) {
            if (cache.has(fishArray(days, fishes[k]).toString())) {
                population += cache.get(fishArray(days, fishes[k]).toString());
            }
            else {
                remainingFish.push(fishes[k]);
            }
        }
        fishes = remainingFish;
        if (fishes.length == 0) {
            break;
        }
        //process remainng fish
        fishes = processFishEachDay(fishes);
        days--;
    }
    return population;
}
function part2(days, cacheDays) {
    var duplicateStarts = decomposeStart();
    var cached_table = dynamicTable(cacheDays);
    var sub_branch_populations = [];
    for (var key = 1; key <= 5; key++) {
        sub_branch_populations[key] = singleFishContribution(days, cached_table, [key]);
    }
    var population = 0;
    for (var key = 1; key <= 5; key++) {
        var product = sub_branch_populations[key] * duplicateStarts.get(key);
        population += product;
    }
    log("After ".concat(days, " days...\nThe fish population is ").concat(population));
}
// main method to run the program
function main(first, second) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        part1(80);
        log('--------------------------------------');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        part2(256, 128);
        log('--------------------------------------');
        log('\n\n');
    }
}
main(true, true);
