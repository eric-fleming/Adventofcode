/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;

const rawInput = inputToStringArray('input-day2.txt', '\n');
//console.table(rawInput);

function part1(){
    log(rawInput);
    
    let answer;
    log(`answer`);
}

function part2() {

    let answer;
    log(`answer`);
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

main(true, false);