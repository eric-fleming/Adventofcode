"use strict";
exports.__esModule = true;
function generatePermutations(size, seed) {
    var items = [];
    var used = [];
    var permutations = [];
    // initialize
    for (var i = 0; i < size; i++) {
        items[i] = i + seed;
        used[i] = false;
    }
    for (var a = 0; a < size; a++) {
        used[a] = true;
        for (var b = 0; b < size; b++) {
            if (used[b]) {
                continue;
            } // skip this index
            else {
                used[b] = true;
            }
            for (var c = 0; c < size; c++) {
                if (used[c]) {
                    continue;
                } // skip this index
                else {
                    used[c] = true;
                }
                for (var d = 0; d < size; d++) {
                    if (used[d]) {
                        continue;
                    } // skip this index
                    else {
                        used[d] = true;
                    }
                    for (var e = 0; e < size; e++) {
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
exports.generatePermutations = generatePermutations;
function test() {
    var perms = generatePermutations(5, 0);
    console.table(perms);
    console.log("---- Number of permutations ----");
    console.log(perms.length);
}
//test();
