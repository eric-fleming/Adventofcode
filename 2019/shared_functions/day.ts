/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared_functions/common';

const rawInput = readInput('day3input.txt');


function firstChallenge() { }
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