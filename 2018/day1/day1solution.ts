/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray, readInputSync } from '../shared_functions/common';


const inputArray = inputToNumberArray('day1input.txt','\n');


function firstChallenge() { 
    let sum = (a:number,b:number) => a+b;
    const total = inputArray.reduce(sum);
    console.log(`The final frequency is ${total}`);
}
function secondChallenge() { 
    // initialize
    let sum = 0;
    let sumlist: number[] = [0];
    const seen = new Set();
    seen.add(0);
    let len = inputArray.length - 1;

    // start search
    for(let f = 0; f < len; f++){
        sum += inputArray[f];
        sumlist.push(sum);
        // check to see if it is already there
        if(seen.has(sum)){
            console.log(`We have seen ${sum} frequency already!`);
            //console.table(sumlist);
            break;
        }
        // put in
        seen.add(sum);
        // restart if you reach the end
        if(f === len - 1){
            f = -1;
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

main(true, true);