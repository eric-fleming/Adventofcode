/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day8.input.txt', '\n');
//console.table(rawInput);

function isUniqueLength(size){
    return size == 2 || size == 3 || size == 4 || size == 7;
}



function part1() {

    const freshInput:string[] = [...rawInput];

    let inputPairs:string[][] = [];
    let inputs:string[] = []
    let outputs: string[] = [];
    for(let k=0; k<freshInput.length;k++){
        let pair = freshInput[k].split(" | ");
        inputPairs[k] = pair;
        inputs[k] = pair[0].trim();
        outputs[k] = pair[1].trim();
    }


    console.table(outputs);

    let count = 0;
    for (let k = 0; k < outputs.length; k++){
        let list = outputs[k].split(" ");
        list.forEach(item =>{
            if(isUniqueLength(item.length)){
                count++;
            }
        })
    }

    log(`${count}`);
}

// 1,4,7,8
// 3
// 0, 9
// 6
// 2, 5

function isZeroDigit(word){
    // 3 and 4 have middle in common
    // has length 6 (1st one)
    // does not have common
}

function isOneDigit(word){
    return word.length == 2;
}

function isTwoDigit(word){
    // missing 2 segments from 6 digit
}

function isThreeDigit(word){
    // is length 5 and contains chars from 1-digit
}



function isFourDigit(word) {
    return word.length == 4;
}

function isFiveDigit(word){
    // missing 1 segment from 6 digit
}

function isSixDigit(word){
    //last one with length 6
}

function isSevenDigit(word) {
    return word.length == 3;
}

function isEigthDigit(word) {
    return word.length == 7;
}

function isNineDigit(word){
    // with length 6 (2nd one)
    //has all the letters of 3 and 4 digit
}

//primes
// 0 : bef (6)
// 1 : len
// 2 : e (5)
// 3 : f (5)
// 4 : len
// 5 : bf (5)
// 6 : bef (6)
// 7 : len
// 8 : len
// 9 : bf (6)


const segmentAppearance = new Map();
segmentAppearance.set('a',8)
segmentAppearance.set('b',6)// p1
segmentAppearance.set('c',8)
segmentAppearance.set('d',7)
segmentAppearance.set('e',4)// p2
segmentAppearance.set('f',9)// p3
segmentAppearance.set('g',7)

const originalDigitMap:Map<string,string> = new Map();
originalDigitMap.set('abcefg','0');
originalDigitMap.set('cf', '1');
originalDigitMap.set('acdeg', '2');
originalDigitMap.set('acdfg', '3');
originalDigitMap.set('bcdf', '4');
originalDigitMap.set('abdfg', '5');
originalDigitMap.set('abdefg', '6');
originalDigitMap.set('acf', '7');
originalDigitMap.set('abcdefg', '8');
originalDigitMap.set('abcdfg', '9');

function part2() {

    let answer;
    log(`${answer}`);
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