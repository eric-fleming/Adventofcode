import { inputToNumberArray } from '../shared/common';
const log = console.log;

const depths = inputToNumberArray('input1.txt','\n');



function part1(){
    let increases: number = 0;

    for (let d = 1; d < depths.length; d++) {
        if (depths[d] > depths[d - 1]) {
            increases++;
        }
    }

    log(`There are ${increases} in the depths`);
}


function part2(){
    let increases: number = 0;
    for (let d = 3; d < depths.length; d++) {
        let firstTriple = depths[d - 3];
        let secondTriple = depths[d];
        if (secondTriple> firstTriple) {
            increases++;
        }
    }
    log(`There are ${increases} in the depths`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        console.log('------  First Challenge Started ------');
        part1();
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        part2();
        console.log('------  Challend Completed -----------');
    }
}

main(true, true);
