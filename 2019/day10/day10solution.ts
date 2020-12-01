/*Dependent Modules*/
import { readInput, inputToArray, inputToMultiStringArray } from '../shared_functions/common';
import { Coordinate } from './coordinate';
const rawInput = readInput('day10input.txt');
const asteroidArray = inputToArray(rawInput,'string','\n');
const asteroidMultiArray = inputToMultiStringArray('day10input.txt','\n');
//console.table(asteroidArray);
//console.table(asteroidMultiArray);

// so you will get a read type error if you land out of bounds

function localAsteroidCount(multiArray: string [][], asteroidChar:string){
    const width = multiArray[0].length;
    const height = multiArray.length;
    let asteroidCount = 0;
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            if(multiArray[x][y] === asteroidChar){
                asteroidCount++;
            }
        }
    }

    return asteroidCount;
}

function buildAsteroidCoordinateArray(multiArray: string[][], asteroidChar: string){
    const width = multiArray[0].length;
    const height = multiArray.length;

    let asteroidCoordinates: Coordinate[] = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (multiArray[x][y] === asteroidChar) {
                let asteroid = new Coordinate(x,y);
                asteroidCoordinates.push(asteroid);
            }
        }
    }

    return asteroidCoordinates;
}

function firstChallenge() { 
    const width = asteroidMultiArray[0].length;
    const height = asteroidMultiArray.length;

    console.log(`There are ${localAsteroidCount(asteroidMultiArray,'#')} ASTEROIDS in this local region.`);


}






function secondChallenge() { }

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

main(true, false);