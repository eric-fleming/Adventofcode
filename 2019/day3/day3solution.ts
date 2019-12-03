/*Dependent Modules*/
import { readInput, inputToStringArray, inputToArray } from '../shared_functions/common';
import { maxHeaderSize } from 'http';

const rawInput = readInput('day3input.txt');
const inputArray = inputToStringArray('day3input.txt','\n');



function createPaths(array: any[]){
    let firstPath = inputToArray(array[0],'string',',');
    let secondPath = inputToArray(array[1], 'string', ',');
    let paths = {
        first: firstPath,
        second: secondPath
    }

    return paths;
}


// function to construct point objects with 'new'
class Point {
    x: number;
    y: number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    equals(other: Point) {
        return ((this.x === other.x) && (this.y === other.y));
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    copy(){
        let x = this.x;
        let y = this.y;
        return new Point(x,y);
    }
}


// convert instruction into a Point-vector
// you can add points
function parseInstruction(instruction: string){
    const dir = instruction[0].toUpperCase();
    const dist = Number(instruction.substring(1));
    let p;
    if(dir === 'U'){
        p = new Point(0,dist);
    }
    else if (dir === 'D'){
        p = new Point(0,-1*dist);
    }
    else if (dir === 'L') { 
        p = new Point(-1*dist,0);
    }
    else if (dir === 'R') { 
        p = new Point(dist,0);
    }
    else{
        console.error(`${dir} is not a proper direction.`);
        return;
    }
    return p;
}

// Takes the path as an array of strings
// converts each string instruction to a point
// adds the point to the list
function buildPointPath(path: any[]){
    let origin = new Point(0, 0);
    let pointSequence: Point[] = [origin];

    for(let p = 0; p < path.length; p++){
        // grab instruction
        let vector = parseInstruction(path[p]);
        let currentPoint = pointSequence[p].copy();
        // adds the instruction to the current point to make next point
        currentPoint.add(vector);
        let nextPoint = currentPoint;
        // place nextPoint into list
        pointSequence.push(nextPoint);
    }

    return pointSequence;
}

function firstChallenge(){
    // get the instructions
    const paths = createPaths(inputArray);
    
    // console.table(paths.first);
    // console.table(paths.second);

    // Generate sequence of points in each path
    let listOfPoints1 = buildPointPath(paths.first);
    let listOfPoints2 = buildPointPath(paths.second);
    console.log('This is the list of points from path 1');
    console.log('--------------------------------------');
    console.table(listOfPoints1);
    console.log('--------------------------------------');


    let path1Size = paths.first.length;
    let path2Size = paths.second.length;
    let intersection = [];
    // I start at 1's because we dont want the origin.
    for(let a = 1; a < path1Size; a++){
        for(let b = 1; b < path2Size; b++){
            if(listOfPoints1[a].equals(listOfPoints2[b])){
                let p = listOfPoints1[a];
                console.log(`Found a point of intersection : (${p.x}, ${p.y})`);
                intersection.push(listOfPoints1[a]);
            }
        }
    }
    // Transform to the Manhattan distance
    const distances = intersection.map(point => Math.abs(point.x) + Math.abs(point.y));
    console.table(distances.length);
    const min = Math.min(...distances);
    console.log(`The minimum distance is ${min}`);

}
function secondChallenge(){}

firstChallenge();
//secondChallenge();