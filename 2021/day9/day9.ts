/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day9.input.txt', '\n');
console.table(rawInput);

function padInput(list:string[],padChar){
    let paddedList = [];
    let cols = list[0].length;
    paddedList.push('A'.repeat(cols+2));
    list.forEach(line => paddedList.push(padChar+line+padChar))
    paddedList.push('A'.repeat(cols + 2));

    return paddedList
}

function convertToMatrix(list:string[]){
    let rows = list.length;
    //let cols = list[0].length;
    let matrix = new Array(rows);
    for(let k=0; k<rows; k++){
        matrix[k] = list[k].split('')
    }
    return matrix;
}

function isLowerThanAbove(matrix,x,y){
    let point = matrix[y][x]
    let topleft = matrix[y - 1][x - 1];
    let topmiddle = matrix[y - 1][x];
    let topright = matrix[y - 1][x + 1];
    return point<topleft && point<topmiddle && point<topright;
}
function isLowerThanSides(matrix, x, y) {
    let point = matrix[y][x]
    let left = matrix[y][x-1];
    let right = matrix[y][x+1];
    return point < left && point < right;
 }
function isLowerThanBelow(matrix, x, y) {
    let point = matrix[y][x]
    let bottomleft = matrix[y + 1][x - 1]
    let bottommiddle = matrix[y + 1][x]
    let bottomright = matrix[y + 1][x + 1]
    return point < bottomleft && point < bottommiddle && point < bottomright;
 }

 function isLowestPoint(matrix,x,y){
     return isLowerThanAbove(matrix, x, y) && isLowerThanSides(matrix, x, y) && isLowerThanBelow(matrix, x, y)
 }

function part1() {

    let paddedList = padInput([...rawInput],'A');
    //console.table(paddedList);

    let matrix = convertToMatrix(paddedList);
    //console.table(matrix);

    let rows = matrix.length;
    let cols = matrix[0].length;

    let lowPointScores = []

    for(let r=1; r<rows-1;r++){
        for(let c=1; c<cols-1;c++){
            if (isLowestPoint(matrix,c,r)){
                lowPointScores.push(Number(matrix[r][c])+1);
            }
        }
    }


    log(lowPointScores);
    let total = lowPointScores.reduce((a,b)=>a+b);
    log(`total score: ${total}`);
}

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