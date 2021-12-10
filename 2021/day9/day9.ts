/*Dependent Modules*/
import { inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day9.input.txt', '\n');
//console.table(rawInput);


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
    let matrix = new Array(rows);
    for(let k=0; k<rows; k++){
        matrix[k] = list[k].split('')
    }
    return matrix;
}

 function isLowestPoint(matrix,x,y){
     let point = matrix[y][x]

     let topleft = matrix[y - 1][x - 1];
     let topmiddle = matrix[y - 1][x];
     let topright = matrix[y - 1][x + 1];
     let top = point < topleft && point < topmiddle && point < topright;

     let left = matrix[y][x - 1];
     let right = matrix[y][x + 1];
     let sides = point < left && point < right;

     let bottomleft = matrix[y + 1][x - 1]
     let bottommiddle = matrix[y + 1][x]
     let bottomright = matrix[y + 1][x + 1]
     let bottom = point < bottomleft && point < bottommiddle && point < bottomright;

     return top && sides && bottom;

 }

function part1() {

    let paddedList = padInput([...rawInput],'A');
    let matrix = convertToMatrix(paddedList);

    let lowPointScores = []

    for (let r = 1; r < matrix.length-1;r++){
        for (let c = 1; c < matrix[0].length-1;c++){
            if (isLowestPoint(matrix,c,r)){
                lowPointScores.push(Number(matrix[r][c])+1);
            }
        }
    }

    let total = lowPointScores.reduce((a,b)=>a+b);
    log(`total score: ${total}`);
}

interface Point{
    x: number;
    y: number;
}

function lowPointCoordinates():Point[]{
    let paddedList = padInput([...rawInput], 'A');
    let matrix = convertToMatrix(paddedList);

    let lowPointCoordinates:Point[] = [];

    for (let r = 1; r < matrix.length - 1; r++) {
        for (let c = 1; c < matrix[0].length - 1; c++) {
            if (isLowestPoint(matrix, c, r)) {
                lowPointCoordinates.push({ x: c, y: r});
            }
        }
    }

    return lowPointCoordinates;
}

function createVisitedMatrix(list: string[]):number[][] {
    let visited = [];
    let cols = list[0].length;
    visited.push(new Array(cols + 2).fill(1));
    list.forEach(line => {
        let row = new Array(cols + 2).fill(0);
        row[0] = 1;
        row[cols+1] = 1;
        visited.push(row);
    })
    visited.push(new Array(cols + 2).fill(1));

    return visited;
}

function edgeOfBasin(value) {
    return value == '9' || value == 'A';
}


function traverse(x, y, matrix, visited) {
    if(visited[y][x] == 1){
        return 0;
    }
    if (x == 0 || y == 0 || (y == matrix.length - 1) || (x == matrix[0].length - 1)) {
        return 0;
    }
    if (edgeOfBasin(matrix[y][x])) {
        return 0;
    }

    visited[y][x] = 1;
    let sum=1;

    if(visited[y][x-1]==0){
        sum += traverse(x-1,y,matrix,visited);
    }
    if (visited[y][x+1] == 0) {
        sum += traverse(x+1, y, matrix, visited);
    }
    if (visited[y-1][x] == 0) {
        sum += traverse(x, y-1, matrix, visited);
    }
    if (visited[y+1][x] == 0) {
        sum += traverse(x, y+1, matrix, visited);
    }
    
    return sum;
}


function part2() {

    let paddedList = padInput([...rawInput], 'A');
    let matrix = convertToMatrix(paddedList);
    let visited = createVisitedMatrix([...rawInput]);

    //get the coordinates of basins
    let startingCoordinates:Point[] = lowPointCoordinates();
    let basinSizes = [];

    // loop through starting points
    // tranverse in 4 directions
    // append to results array
    startingCoordinates.forEach(point => {
        let size = traverse(point.x,point.y,matrix,visited);
        basinSizes.push(size);
    });

    // sort
    // multiply the top 3
    basinSizes.sort((a,b)=> a-b)
    let len = basinSizes.length;
    let product;
    if(len >=3){
        product = basinSizes[len - 1] * basinSizes[len - 2] * basinSizes[len - 3]
    } else{
        product = null;
    }

    log(`product = ${product}`);
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

main(true, true);