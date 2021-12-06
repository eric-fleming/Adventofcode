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
//console.table(rawInput);
function processDay(fishArray) {
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
function part1() {
    var days = 80;
    var fishes = rawInput;
    while (days > 0) {
        fishes = processDay(fishes);
        days--;
    }
    //console.table(fishes);
    log("There are ".concat(fishes.length, " in the population"));
}
function lifetimeImpact(days, fishes) {
    while (days > 0) {
        fishes = processDay(fishes);
        days--;
    }
    return fishes.length;
}
function fish(countdownVal, day) {
    return {
        day: day,
        val: countdownVal
    };
}
function addFishDepthFirst(seedFish) {
    var population = 0;
    var seedfish = seedFish;
    var fishStack = [];
    while (seedfish != undefined) {
        //log(`new seed fish: [day, val] = ${seedfish.day} ${seedfish.val}`);
        // add new fish to stack
        while (seedfish.day > 0) {
            if (seedfish.val > 0) {
                seedfish.val -= 1;
            }
            else if (seedfish.val == 0) {
                fishStack.push(fish(8, seedfish.day));
                seedfish.val = 6;
            }
            seedfish.day -= 1;
            if (seedfish.val > seedfish.day) {
                //can't create any more
                seedfish.day = 0;
            }
        }
        // remove seed fish
        if (seedfish.day == 0) {
            population += 1;
            seedfish = undefined;
        }
        // move to next seed fish
        seedfish = fishStack.pop();
    }
    return population;
}
function part2() {
    var totalPopulation = 0;
    var date = 18;
    var cache = new Map();
    var startingFish = [3, 4, 3, 1, 2];
    log("Starting fish...");
    log("day: ".concat(date, "\t val: ").concat(startingFish[0]));
    while (startingFish.length > 0) {
        var seedFishValue = startingFish.pop();
        if (cache.has(seedFishValue)) {
            totalPopulation += cache.get(seedFishValue);
        }
        else {
            var subPopulation = addFishDepthFirst(fish(seedFishValue, date));
            totalPopulation += subPopulation;
            cache.set(seedFishValue, subPopulation);
        }
    }
    log("total population: ".concat(totalPopulation, " of fish"));
    console.table(cache);
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
//main(false, false);
function cacheBuilder(val, days) {
    if (days == 0) {
        return 1;
    }
    var fishes = [val];
    //log('started while')
    while (days > 0) {
        fishes = processDay(fishes);
        days--;
    }
    //log('finished while')
    return fishes.length;
}
function fishArray(day, val) {
    return [day, val];
}
function dynamicTable(dayLimit) {
    var table = new Map();
    var counter = 0;
    for (var day = dayLimit; day > 0; day--) {
        //log('started '+day+' day');
        for (var val = 8; val >= 0; val--) {
            var sub_population = cacheBuilder(val, day);
            table.set(fishArray(day, val).toString(), sub_population);
            counter++;
            //log(`counter at ${counter}`);
        }
        //log(`finished day ${day}`);
    }
    return table;
}
function decomposeStart() {
    var fishes = rawInput;
    var starts = new Map();
    for (var k = 0; k < fishes.length; k++) {
        var fish_1 = fishes[k];
        if (starts.has(fish_1)) {
            var mapVal = starts.get(fish_1);
            starts.set(fish_1, mapVal + 1);
        }
        else {
            starts.set(fish_1, 1);
        }
    }
    return starts;
}
function part1withCache(days, cache, input) {
    var fishes = input; //rawInput [3, 4, 3, 1, 2]
    var population = 0;
    while (days > 0) {
        //scan for fish in cache
        //move fish to new array
        var remainingFish = [];
        for (var k = 0; k < fishes.length; k++) {
            if (cache.has(fishArray(days, fishes[k]).toString())) {
                //log('in cache')
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
        fishes = processDay(fishes);
        days--;
    }
    //console.table(fishes);
    //log(`There are ${population} in the population`);
    return population;
}
var duplicateStarts = decomposeStart();
console.table(duplicateStarts);
log(rawInput.length);
/**
log('---------------------')
log('part 1 with cache\n')

log('fish after 80 days = ' + part1withCache(256,128));
log('---------------------')
*/
/*
let arr = [8,1];
log(arr.toString());

console.table(cache);
console.log(cache.has([8, 1].toString()));
*/
function realPart2() {
    var duplicateStarts = decomposeStart();
    var sub_branch_populations = [];
    log('caching started...');
    var cache = dynamicTable(128);
    log('caching complete');
    for (var key = 1; key <= 5; key++) {
        log("sub brach ".concat(key, " started..."));
        sub_branch_populations[key] = part1withCache(256, cache, [key]);
        log("sub brach ".concat(key, " completed"));
    }
    var population = 0;
    for (var key = 1; key <= 5; key++) {
        var product = sub_branch_populations[key] * duplicateStarts.get(key);
        population += product;
    }
    log("Total population = ".concat(population));
}
log('---------------------');
log('part 2 with cache\n');
log('fish after 256 days = ');
realPart2();
