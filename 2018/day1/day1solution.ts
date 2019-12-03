/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray, readInputSync } from '../shared_functions/common';


const inputArray = inputToNumberArray('day1input.txt','\n');


function firstChallenge() { 
    let sum = (a,b) => a+b;
    const total = inputArray.reduce(sum);
    console.log(total);
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

main(true, true);