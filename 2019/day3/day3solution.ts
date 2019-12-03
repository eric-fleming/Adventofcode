/*Dependent Modules*/
import { createPaths, buildPointPath} from './path';


function firstChallenge(){
    // get the instructions
    const paths = createPaths();
    
    // Generate sequence of points in each path
    let listOfPoints1 = buildPointPath(paths.first);
    let listOfPoints2 = buildPointPath(paths.second);
    
    let intersection = [];
    // I start at 1's because we dont want the origin.
    for (let a = 1; a < listOfPoints1.length; a++){
        for (let b = 1; b < listOfPoints2.length; b++){
            if(listOfPoints1[a].equals(listOfPoints2[b])){
                let p = listOfPoints1[a];
                //console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
                intersection.push(listOfPoints1[a]);
            }
        }
    }
    // Transform to the Manhattan distance
    console.log(`Number of Intersectios : ${intersection.length}`);
    const distances = intersection.map(point => Math.abs(point.getX()) + Math.abs(point.getY()));
    const min = Math.min(...distances);
    console.log(`The minimum distance is ${min}`);
}



function secondChallenge(){
    // get the instructions
    const paths = createPaths();

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
                //console.log(`Found a point of intersection : (${p.getX()}, ${p.getY()})`);
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

// main method to run the program
function main(first:boolean, second: boolean){
    if(first){
        console.log('------  First Challenge Started ------');
        firstChallenge();
        console.log('------  Challend Completed -----------');
    }
    if(second){
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}

main(true, true);