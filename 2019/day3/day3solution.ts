/*Dependent Modules*/
import { readInput, inputToStringArray, inputToArray } from '../shared_functions/common';

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

function firstChallenge(){
    const paths = createPaths(inputArray);
    //console.table(paths.first);
    //console.table(paths.second);


}
function secondChallenge(){}

firstChallenge();
//secondChallenge();