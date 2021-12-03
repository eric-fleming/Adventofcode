/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day2input.txt','\n');
//console.table(rawInput);

function part1() { 
    //console.table(rawInput);
    let horizontal = 0;
    let depth = 0;
    for(let i=0;i <rawInput.length;i++){
        let arr = rawInput[i].split(" ");
        let dir = arr[0];
        let val = arr[1];
        
        let amount = parseInt(val);
        if(dir == "down"){
            depth += amount;
        } else if(dir == "up"){
            depth -= amount;
        } else if(dir == "forward"){
            horizontal += amount;
        } else{
            log(`ERROR: what is ${dir}`);
        }

    }

    log(`product = ${horizontal * depth}`);
}

function part2() { 
    //console.table(rawInput);
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < rawInput.length; i++) {
        let arr = rawInput[i].split(" ");
        let dir = arr[0];
        let val = arr[1];

        let amount = parseInt(val);
        if (dir == "down") {
            aim += amount;
        } else if (dir == "up") {
            aim -= amount;
        } else if (dir == "forward") {
            horizontal += amount;
            depth += aim*amount;
        } else {
            log(`ERROR: what is ${dir}`);
        }

    }

    log(`product = ${horizontal * depth}`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        part1();
        log('--------------------------------------');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        part2();
        log('--------------------------------------');
        log('\n\n');
    }
}

main(true, true);