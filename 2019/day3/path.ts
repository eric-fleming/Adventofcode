
import { inputToStringArray, inputToArray } from '../shared_functions/common';
import { Point } from './point';


// read the input file from the same directory
// first split it into the two paths
// then split each path into a sequence of instructions
export function createPaths() {
    const inputArray = inputToStringArray('day3input.txt', '\n');
    let firstPath = inputToArray(inputArray[0], 'string', ',');
    let secondPath = inputToArray(inputArray[1], 'string', ',');
    let paths = {
        first: firstPath,
        second: secondPath
    }

    return paths;
}


// print a series of points for logging
// Helped with debugging
export function PrintPoints(array: any, length: number) {
    for (let p = 0; p < length; p++) {
        console.log(`(${array[p].getX()}, ${array[p].getY()}) with len = ${array[p].getLength()}`);
    }
}

// convert instruction into a Point-vector
// you can add points
// each instruction is taken from one of the two paths returned from createPaths()
export function parseInstruction(instruction: string) {
    const dir = instruction[0].toUpperCase();
    const dist = Number(instruction.substring(1));
    if (dir === 'U' || dir === 'D' || dir === 'L' || dir === 'R') {
        return { direction: dir, distance: dist }
    }
    else {
        console.error(`${dir} is not a proper direction.`);
        return;
    }
}


// Takes the path as an array of strings
// converts each string instruction to a point
// adds the point to the list
export function buildPointPath(path: any[]) {
    let origin = new Point(0, 0, 0);
    let pointSequence: Point[] = [origin];

    for (let p = 0; p < path.length; p++) {
        // grab instruction
        let vector = parseInstruction(path[p]);
        let c = pointSequence.length - 1;

        // adds the instruction to the current point to make next point
        for (let d = 0; d < vector.distance; d++) {
            let nextPoint: Point;
            let currentPoint = pointSequence[c + d].copy();
            //decide
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
            // place nextPoint into list repeatedly
            pointSequence.push(nextPoint);
        }

    }

    return pointSequence;
}