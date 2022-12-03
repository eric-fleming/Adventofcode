/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;

const rawInput: string[] = inputToStringArray('input-day3.txt', '\n');
table(rawInput);

function priorityScore(letter:string) :number {

    let charCode = letter.charCodeAt(0);
    if(charCode >=97 && charCode <=122){
        return charCode-96;
    }
    else if (charCode >= 65 && charCode <= 90) {
        return charCode - 38;
    }
    return 0;
}

function part1() {

    let rucksacks:string[][] = [];
    for(let k = 0; k<rawInput.length;k++){
        let sack = rawInput[k]
        let len = sack.length;
        let parts = [
            sack.substring(0,len/2),
            sack.substring(len/2,len)
        ];
        //log(parts[0].length == parts[1].length);
        rucksacks.push(parts);
    }
    table(rucksacks);

    let overlaps: string[] = [];
    for(let k=0;k<rucksacks.length;k++){
        let part1 = rucksacks[k][0];
        let part2 = rucksacks[k][1];
        let size = part1.length;
        for (let c = 0; c < size; c++){
            let char = part1[c];
            if(part2.indexOf(char) >= 0){
                overlaps.push(char);
                break;
            }
        }
    }

    let scores = overlaps.map( c => priorityScore(c));

    let sum=0;
    for(let d=0;d<scores.length;d++){
        sum += scores[d];
    }
    //table(overlaps);
    //table(scores);
    log('scores.length = ' + scores.length);
    log(`${sum}`);
}

function commonLetter(parts:string[]):string{

    let part1 = parts[0];
    let part2 = parts[1];
    let part3 = parts[2];

    let overlaps: string[] = [];
    for (let c = 0; c < part1.length; c++) {
        let char = part1[c];
        if (part2.indexOf(char) >= 0) {
            overlaps.push(char);
        }
    }
    let overlap;
    for (let c = 0; c < overlaps.length; c++) {
        let char = overlaps[c];
        if (part3.indexOf(char) >= 0) {
            overlap = char;
            break;
        }
    }
    return overlap;
}

function part2() {

    let rucksacks: string[][] = [];
    for (let k = 0; k < rawInput.length; k=k+3) {
        let sack = [rawInput[k], rawInput[k+1], rawInput[k+2]]
        rucksacks.push(sack);
    }
    table(rucksacks);

    let overlaps:string[] = []
    for (let k = 0; k < rucksacks.length; k++){
        log(rucksacks[k].length ==3)
        overlaps.push(commonLetter(rucksacks[k]));
    }
    table(overlaps);

    let scores = overlaps.map(c => priorityScore(c));

    let sum = 0;
    for (let d = 0; d < scores.length; d++) {
        sum += scores[d];
    }
    //table(overlaps);
    //table(scores);
    log('scores.length = ' + scores.length);
    log(`${sum}`);

    
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('######################################');
        log('----------  First Challenge ----------');
        log('######################################');
        part1();
        log('\n\n');
    }
    if (second) {
        log('######################################');
        log('----------  Second Challenge ---------');
        log('######################################');
        part2();
        log('\n\n');
    }
}

main(false, true);