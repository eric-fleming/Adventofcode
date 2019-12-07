"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var intCodeComputer_1 = require("../day5/intCodeComputer");
var rawInput = common_1.readInput('day7input.txt');
function firstChallenge() {
}
function generatePermutations(size) {
    var items = [];
    var used = [];
    var permutations = [];
    // initialize
    for (var i = 1; i <= size; i++) {
        items[i] = i;
        used[i] = false;
    }
    for (var a = 1; a <= size; a++) {
        used[a] = true;
        for (var b = 1; b <= size; b++) {
            if (used[b]) {
                continue;
            } // skip this index
            else {
                used[b] = true;
            }
            for (var c = 1; c <= size; c++) {
                if (used[c]) {
                    continue;
                } // skip this index
                else {
                    used[c] = true;
                }
                for (var d = 1; d <= size; d++) {
                    if (used[d]) {
                        continue;
                    } // skip this index
                    else {
                        used[d] = true;
                    }
                    for (var e = 1; e <= size; e++) {
                        if (used[e]) {
                            continue;
                        } // skip this index
                        else {
                            permutations.push([a, b, c, d, e]);
                        }
                    }
                    used[d] = false;
                }
                used[c] = false;
            }
            used[b] = false;
        }
        used[a] = false;
    }
    return permutations;
}
var perms = generatePermutations(5);
console.table(perms);
console.log("---- Number of permutations ----");
console.log(perms.length);
function secondChallenge() { }
// main method to run the program
function main(first, second) {
    var permuation = 1;
    var Computer = new intCodeComputer_1.IntCodeComputer();
    Computer.loadInstructions(permuation, 'day7input.txt');
    Computer.run();
    Computer.reset();
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
//main(false, false);
