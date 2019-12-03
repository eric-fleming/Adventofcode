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
    private x: number;
    private y: number;
    private length: number;

    constructor(x:number, y:number,plen:number){
        this.x = x;
        this.y = y;
        this.length = plen;
    }

    equals(other: Point) {
        return ((this.x === other.x) && (this.y === other.y));
    }
    add(vector) {
        let nextx = this.x + vector.x;
        let nexty = this.y + vector.y;
        let nextlen = this.length + vector.length;
        return new Point(nextx, nexty, nextlen);
    }
    copy(){
        let x = this.x;
        let y = this.y;
        let plen = this.length;
        return new Point(x, y, plen);
    }
    getX(){
        return this.x;
    }
    getY() {
        return this.y;
    }
    getLength() {
        return this.length;
    }

}


// print a series of points for logging
function PrintPoints(array: any, length:number){
    for(let p=0; p< length; p++){
        console.log(`(${array[p].getX()}, ${array[p].getY()}) with len = ${array[p].getLength()}`);
    }
}


// convert instruction into a Point-vector
// you can add points
function parseInstruction(instruction: string){
    const dir = instruction[0].toUpperCase();
    const dist = Number(instruction.substring(1));
    if (dir === 'U' || dir === 'D' || dir === 'L' || dir === 'R'){
        return {direction:dir, distance:dist}
    }
    else{
        console.error(`${dir} is not a proper direction.`);
        return;
    }
}

// Takes the path as an array of strings
// converts each string instruction to a point
// adds the point to the list
function buildPointPath(path: any[]){
    let origin = new Point(0, 0, 0); // length initialized to zero
    let pointSequence: Point[] = [origin];

    for(let p = 0; p < path.length; p++){
        // grab instruction
        let vector = parseInstruction(path[p]);
        let c = pointSequence.length - 1;
        // delete?? let currentPoint = pointSequence[c].copy();
        
        // adds the instruction to the current point to make next point
        for(let d = 0 ; d < vector.distance; d++){
            let nextPoint: Point;
            let currentPoint = pointSequence[c+d].copy();
            if (vector.direction === 'U') {
                let U = new Point(0, 1, 1);
                nextPoint = currentPoint.add(U);
            }
            else if (vector.direction === 'D') {
                let D = new Point(0, -1, 1);
                nextPoint = currentPoint.add(D);
            }
            else if (vector.direction === 'R') {
                let R = new Point(1, 0, 1);
                nextPoint = currentPoint.add(R);
            }
            else if (vector.direction === 'L') {
                let L = new Point(-1, 0, 1);
                nextPoint = currentPoint.add(L);
            }
            //
            // place nextPoint into list repeatedly
            pointSequence.push(nextPoint);
        }
        
    }

    return pointSequence;
}

function firstChallenge(){
    // get the instructions
    const paths = createPaths(inputArray);
    
    // console.table(paths.first);
    // console.table(paths.second);

    // Generate sequence of points in each path
    console.log(`length of instructions 1: ${paths.first.length}`);
    console.log(`length of instructions 2: ${paths.second.length}`);
    let listOfPoints1 = buildPointPath(paths.first);
    let listOfPoints2 = buildPointPath(paths.second);
    console.log(`length of list 1: ${listOfPoints1.length}`);
    console.log(`length of list 2: ${listOfPoints2.length}`);
     
    console.log('------ printing test points ------');
    PrintPoints(listOfPoints1,10);
    console.log('------ printing test points ------');
    PrintPoints(listOfPoints2,10);
    /***/
    let path1Size = listOfPoints1.length;
    let path2Size = listOfPoints2.length;
    let intersection = [];
    /** 
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
    console.log(`Number of Intersectios : ${intersection.length}`);
    const distances = intersection.map(point => Math.abs(point.x) + Math.abs(point.y));
    console.table(distances.length);
    const min = Math.min(...distances);
    console.log(`The minimum distance is ${min}`); // */
}
function secondChallenge(){}

firstChallenge();
//secondChallenge();