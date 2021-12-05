/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput: string[] = inputToStringArray('day5input.txt', '\n');
const SIZE = 1000;
//console.table(rawInput);

function createEndPoint(point:string):number[]{
    point = point.trim()
    let vals:number[] = point.split(",").map((val)=>parseInt(val));
    return vals;
}

function createEndPointPair(inputLine:string){
    let pair = inputLine.split(" -> ").map((point) => createEndPoint(point));
    return pair;
}

function generateMatrix(rows:number,cols:number,value){
    let matrix = [];
    for(let r = 0; r<rows;r++){
        let row = new Array(cols);
        row.fill(value);
        matrix[r]=row;
    }
    return matrix;
}

function createSquareMatrix(size: number,defaultVal){

    let matrix = new Array(size);
    for (let r = 0; r < size; r++){
        let row = new Array(size);
        row.fill(defaultVal);
        matrix[r]=row;
    }
    return matrix;
}

function AddPointsToMatrix(matrix,line){

    let x1 = line[0][0];
    let x2 = line[1][0];
    let y1 = line[0][1];
    let y2 = line[1][1];

    let Xmin = Math.min(x1, x2);
    let Xmax = Math.max(x1, x2);
    let Ymin = Math.min(y1, y2);
    let Ymax = Math.max(y1, y2);

    let horizontal = line[0][0] == line[1][0];
    let vertical = line[0][1] == line[1][1];

    if(horizontal){
        let x = line[0][0];
        for(let c=Ymin; c<=Ymax; c++){
            matrix[x][c] += 1;
        }
        return matrix;
    }
    else if(vertical){
        let y = line[0][1];
        for (let c = Xmin; c <= Xmax; c++) {
            matrix[c][y] += 1;
        }
        return matrix;
    }
    // part 2
    let slope = ((y2 - y1) / (x2 - x1));
    let steps = Xmax-Xmin;

    if (slope == 1) {
        for (let p = 0; p<=steps; p++) {
            matrix[Xmin+p][Ymin+p] += 1
        }
        return matrix;
    }

    else if (slope == -1) {
        for (let p = 0; p<=steps; p++) {
            matrix[Xmin + p][Ymax - p] += 1
        }
        return matrix;
    }
    log('Line did not conform to any plan');
    return matrix;
}

function countOverlappingLines(matrix){
    let count = 0;
    let size = matrix.length;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (matrix[x][y] > 1) {
                count++;
            }
        }
    }
    return count;
}

function part1() {

    let endPointList = [];
    for(let p=0; p < rawInput.length; p++){
        let line = createEndPointPair(rawInput[p]);
        endPointList.push(line);
    }

    let filteredEndPointList = endPointList.filter(pair => pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]);

    let matrix = generateMatrix(SIZE,SIZE,0);

    for (let k = 0; k < filteredEndPointList.length; k++) {
        let line = filteredEndPointList[k];
        matrix = AddPointsToMatrix(matrix,line);
    }

    log(`------ THE COUNT ------`)
    log(`${countOverlappingLines(matrix)}`);
}

function part2() {
    
    let endPointList = [];
    for (let p = 0; p < rawInput.length; p++) {
        let line = createEndPointPair(rawInput[p]);
        endPointList.push(line);
    }

    let matrix = createSquareMatrix(SIZE, 0);

    for (let k = 0; k < endPointList.length; k++) {
        let line = endPointList[k];
        matrix = AddPointsToMatrix(matrix, line);
    }

    log(`------ THE COUNT ------`)
    log(`${countOverlappingLines(matrix)}`);
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