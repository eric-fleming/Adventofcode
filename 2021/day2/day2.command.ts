/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day2input.txt', '\n');
//console.table(rawInput);

let state = {
    depth: 0,
    horizontal: 0
}
let commands = {
    "down": (val: number) => { state.depth += val },
    "up": (val: number) => { state.depth -= val },
    "forward": (val: number) => { state.horizontal += val }
}

function part1() {
    
    for (let i = 0; i < rawInput.length; i++) {
        let arr = rawInput[i].split(" ");
        let dir: string = arr[0].trim();
        let val: number = parseInt(arr[1]);

        let command = commands[dir]
        if(command != undefined){
            command(val)
        } else{
            log(`ERROR: I don't have the \"${dir}\" registered as a command`);
        }


    }

    log(`product = ${state.horizontal * state.depth}`);
}













function part2(){}



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

main(true, false);