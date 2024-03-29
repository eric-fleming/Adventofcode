/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;

const rawInput: string[] = inputToStringArray('input-day2.txt', '\n');
//console.table(rawInput);

//  A   X   ROCK
//  B   Y   PAPER
//  C   Z   SISSORS
let playMap = new Map();
playMap.set('A X', 3);
playMap.set('A Y', 6);
playMap.set('A Z', 0);
playMap.set('B X', 0);
playMap.set('B Y', 3);
playMap.set('B Z', 6);
playMap.set('C X', 6);
playMap.set('C Y', 0);
playMap.set('C Z', 3);


//  A   ROCK    X   LOSE
//  B   PAPER   Y   DRAW
//  C   SISSORS Z   WIN
let outcomeMap = new Map();
outcomeMap.set('A X', 3);
outcomeMap.set('A Y', 1);
outcomeMap.set('A Z', 2);

outcomeMap.set('B X', 1);
outcomeMap.set('B Y', 2);
outcomeMap.set('B Z', 3);

outcomeMap.set('C X', 2);
outcomeMap.set('C Y', 3);
outcomeMap.set('C Z', 1);

//14224
function part1(){
    //log(rawInput);

    let score = 0;
    for(let k=0; k<rawInput.length-1;k++){
        //log(playMap.get(rawInput[k]))
        score += playMap.get(rawInput[k]);
        if (rawInput[k].indexOf("X") > 0){
            score += 1;
        }
        else if (rawInput[k].indexOf("Y") > 0) {
            score += 2;
        }
        else if (rawInput[k].indexOf("Z") > 0) {
            score += 3;
        }
    }
    
    let answer;
    log(`total`)
    log(`${score}`);
}

function part2() {

    let score = 0;
    for (let k = 0; k < rawInput.length - 1; k++) {
        //log(outcomeMap.get(rawInput[k]))
        score += outcomeMap.get(rawInput[k]);
        if (rawInput[k].indexOf("X") > 0) {
            score += 0;
        }
        else if (rawInput[k].indexOf("Y") > 0) {
            score += 3;
        }
        else if (rawInput[k].indexOf("Z") > 0) {
            score += 6;
        }
    }

    let answer;
    log(`total`)
    log(`${score}`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        log('--------------------------------------');
        part1();
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        log('--------------------------------------');
        part2();
        log('\n\n');
    }
}

main(false, true);