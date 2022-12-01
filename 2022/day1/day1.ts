/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;

const rawInput = inputToNumberArray('input-day1.txt', '\n');
//console.table(rawInput);

function part1():number[] {

    let elfTotalCals: number[] = [];
    let subtotal: number = 0;
    for(let k=0; k<rawInput.length;k++){
        if(rawInput[k] == 0){
            elfTotalCals.push(subtotal);
            subtotal = 0;
            continue;
        } else{
            subtotal += rawInput[k];
        }
    }

    let answer;
    table(`${Math.max(...elfTotalCals)}`);
    return elfTotalCals;
}

function part2() {

    let elfTotalCals: number[] = [];
    let subtotal: number = 0;
    for (let k = 0; k < rawInput.length; k++) {
        if (rawInput[k] == 0) {
            elfTotalCals.push(subtotal);
            subtotal = 0;
            continue;
        } else {
            subtotal += rawInput[k];
        }
    }

    elfTotalCals = elfTotalCals.sort((a,b) => b-a);

    let answer;
    log(`${elfTotalCals[0]+elfTotalCals[1]+elfTotalCals[2]}`);
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