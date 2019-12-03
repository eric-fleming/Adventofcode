/*Dependent Modules*/
import { readInput, inputToStringArray } from '../shared_functions/common';
import { createPaths, parseInstruction, buildPointPath, PrintPoints} from './path';

const rawInput = readInput('day3input.txt');
const inputArray = inputToStringArray('day3input.txt', '\n');




//cut createPaths


// cut Point class



// cut PrintPoints


// cut parseInstruction

// cut buildPointPath

function firstChallenge(){
    // get the instructions
    const paths = createPaths(inputArray);
    
    // Generate sequence of points in each path
    console.log(`length of instructions 1: ${paths.first.length}`);
    console.log(`length of instructions 2: ${paths.second.length}`);
    let listOfPoints1 = buildPointPath(paths.first);
    let listOfPoints2 = buildPointPath(paths.second);
    console.log(`length of list 1: ${listOfPoints1.length}`);
    console.log(`length of list 2: ${listOfPoints2.length}`);
    
    let path1Size = listOfPoints1.length;
    let path2Size = listOfPoints2.length;
    let intersection = [];
    
    // I start at 1's because we dont want the origin.
    for(let a = 1; a < path1Size; a++){
        for(let b = 1; b < path2Size; b++){
            if(listOfPoints1[a].equals(listOfPoints2[b])){
                let p = listOfPoints1[a];
                console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
                intersection.push(listOfPoints1[a]);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log(`Number of Intersectios : ${intersection.length}`);
    const distances = intersection.map(point => Math.abs(point.getX()) + Math.abs(point.getY()));
    console.table(distances.length);
    const min = Math.min(...distances);
    console.log(`The minimum distance is ${min}`); // */
}
function secondChallenge(){
    // get the instructions
    const paths = createPaths(inputArray);

    // Generate sequence of points in each path
    let listOfPoints1 = buildPointPath(paths.first);
    let listOfPoints2 = buildPointPath(paths.second);
    
   
    let intersectionPairs = [];

    // I start at 1's because we dont want the origin.
    for (let a = 1; a < listOfPoints1.length; a++) {
        for (let b = 1; b < listOfPoints2.length; b++) {
            if (listOfPoints1[a].equals(listOfPoints2[b])) {
                let p = listOfPoints1[a];
                let pair = [listOfPoints1[a].getLength(), listOfPoints2[b].getLength()];
                console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
                intersectionPairs.push(pair);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log(`Number of Intersectios : ${intersectionPairs.length}`);
    const intersctionTotalLengths = intersectionPairs.map(pair => pair[0] + pair[1]);
    
    const min = Math.min(...intersctionTotalLengths);
    console.log(`The minimum length of both wires combined is ${min}`); // */
}

//firstChallenge();
secondChallenge();