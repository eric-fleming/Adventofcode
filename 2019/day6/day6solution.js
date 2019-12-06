"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var orbit_1 = require("./orbit");
var rawInput = common_1.readInput('day6input.txt');
var orbitArray = common_1.inputToArray(rawInput, 'string', '\n');
var spaceDictionary = [];
var spaceMap = new Map();
function parseOrbit(mapfact) {
    var orb = mapfact.indexOf(')');
    var p = mapfact.substring(0, orb).trim();
    var c = mapfact.substring(orb + 1).trim();
    return { parent: p, child: c };
}
function buildSpaceMapAndDictionary() {
    // build the map of Parent ---> [children]
    var len = orbitArray.length - 1; // to prevent EOL character from joining the list
    for (var p = 0; p < len; p++) {
        // store {parent, child}
        var mapfact = parseOrbit(orbitArray[p]);
        if (spaceMap.has(mapfact.parent)) {
            var children = spaceMap.get(mapfact.parent);
            children.push(mapfact.child);
            spaceMap.set(mapfact.parent, children);
        }
        else {
            spaceMap.set(mapfact.parent, [mapfact.child]);
        }
    }
    //convert map to object array
    var mapSize = spaceMap.size;
    var keyIterator = spaceMap.keys();
    for (var m = 0; m < mapSize; m++) {
        var p = keyIterator.next().value;
        spaceDictionary[m] = new orbit_1.Orbit(p, spaceMap.get(p));
    }
    //console.table(spaceDictionary);
    //console.table(spaceMap);
}
function recurvsiveOrbitSum(parent) {
    var children = spaceMap.get(parent);
    if (children === undefined) {
        return 0;
    }
    else {
        var myOrbits = children.length;
        var futureOrbits = children.map(recurvsiveOrbitSum);
        return futureOrbits.reduce(function (sum, orbit) { return sum + orbit; }, myOrbits);
    }
}
function firstChallenge() {
    // initiaize Information
    buildSpaceMapAndDictionary();
    //console.table(spaceDictionary);
    console.log("Space Dictionary Length = " + spaceDictionary.length);
    // prep for math
    var orbitCheckSum = 0;
    var size = spaceMap.size;
    var keyIterator = spaceMap.keys();
    for (var s = 0; s < size; s++) {
        var parent_1 = keyIterator.next().value;
        var starBranch = recurvsiveOrbitSum(parent_1);
        orbitCheckSum += starBranch;
    }
    console.log("The total number of orbits is = " + orbitCheckSum);
}
function secondChallenge() { }
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
main(true, false);
