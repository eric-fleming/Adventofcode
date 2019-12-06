/*Dependent Modules*/
import { readInput, inputToArray,
        inputToNumberArray, inputToStringArray,
        stringInputToObject, stringArrayToObjectArray } from '../shared_functions/common';

import { Orbit } from './orbit';

const rawInput = readInput('day6input.txt');

const orbitArray = inputToArray(rawInput,'string','\n');
const spaceDictionary: Orbit[] = [];
const spaceMap= new Map();


function parseOrbit(mapfact){
    let orb = mapfact.indexOf(')');
    let p = mapfact.substring(0, orb).trim();
    let c = mapfact.substring(orb + 1).trim();
    return {parent:p, child:c}
}

function buildSpaceMapAndDictionary(){
    // build the map of Parent ---> [children]
    let len = orbitArray.length - 1; // to prevent EOL character from joining the list
    for (let p = 0; p < len; p++) {
        // store {parent, child}
        let mapfact = parseOrbit(orbitArray[p]);
        if (spaceMap.has(mapfact.parent)) {
            let children = spaceMap.get(mapfact.parent);
            children.push(mapfact.child);
            spaceMap.set(mapfact.parent, children);
        }
        else {
            spaceMap.set(mapfact.parent, [mapfact.child]);
        }
    }
    //convert map to object array
    let mapSize = spaceMap.size;
    let keyIterator = spaceMap.keys();
    for (let m = 0; m < mapSize; m++) {
        let p = keyIterator.next().value;
        spaceDictionary[m] = new Orbit(p, spaceMap.get(p));
    }

    //console.table(spaceDictionary);
    //console.table(spaceMap);
}

function recurvsiveOrbitSum(parent: string){
    let children = spaceMap.get(parent);
    if(children === undefined){
        return 0;
    }
    else{
        let myOrbits = children.length;
        let futureOrbits = children.map(recurvsiveOrbitSum);
        
        return futureOrbits.reduce((sum, orbit) => sum + orbit, myOrbits);
    }
}

function firstChallenge() {
    // initiaize Information
    buildSpaceMapAndDictionary();
    //console.table(spaceDictionary);
    console.log(`Space Dictionary Length = ${spaceDictionary.length}`);
    
    // prep for math
    
    let orbitCheckSum = 0;
    let size = spaceMap.size;
    let keyIterator = spaceMap.keys();
    
    for(let s = 0; s < size; s++){
        let parent = keyIterator.next().value;
        let starBranch = recurvsiveOrbitSum(parent);
        orbitCheckSum += starBranch;
    }

    console.log(`The total number of orbits is = ${orbitCheckSum}`);
    
}




function secondChallenge() { 
    // buildSpaceMapAndDictionary();
    let parent: string[] = [];
    let child: string[] = [];
    for(let p=0; p < orbitArray.length-1; p++){
        let mapfact = parseOrbit(orbitArray[p]);
        parent[p] = mapfact.parent;
        child[p] = mapfact.child;
    }

    
    // create orbit lineages
    let you_lineage:string[] = [];
    let you_index = child.indexOf('YOU');
    while (you_index > 0){
        // find and record parent
        let myParent = parent[you_index];
        you_lineage.push(myParent);
        // look for your parent's PARENT
        // will return an index or -1 if not existend
        you_index = child.indexOf(myParent);

    }

    let san_lineage: string[] = [];
    let san_index = child.indexOf('SAN');
    while (san_index > 0) {
        let myParent = parent[san_index];
        san_lineage.push(myParent);
        san_index = child.indexOf(myParent);
    }


    //console.log('YOU Lineage = '+you_lineage.length);
    //console.log('SAN Lineage = '+san_lineage.length);
    loop1:
    for(let y = 0; y < you_lineage.length; y++){
        loop2:
        for (let s = 0; s < san_lineage.length; s++){
            if(you_lineage[y] === san_lineage[s]){
                console.log(`The orbital Shift is...`);
                console.log(`YOU + SAN = ?????`);
                console.log(`${y} + ${s} == ${y + s}`);
                break loop1;
            }
        }
    }
}






// main method to run the program
function main(first: boolean, second: boolean) {
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

main(false, true);