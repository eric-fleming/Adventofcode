/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day5input.txt', '\n');
const SIZE = 1000;
console.table(rawInput);


function createEndPoint(pointString){
    pointString = pointString.trim()
    let vals = pointString.split(",")
    vals[0] = parseInt(vals[0]);
    vals[1] = parseInt(vals[1]);
    return vals;
}

function createEndPoints(list){
    let pair = list.split(" -> ");
    let A = pair[0];
    A = createEndPoint(A);
    //log(A);
    let B = pair[1];
    B = createEndPoint(B);
    //log(B);
    return [A,B];
}

function generateMatrix(rows,cols,value){
    let matrix = [];
    for(let r = 0; r<rows;r++){
        let row = []
        for(let c = 0; c<cols;c++){
            row.push(value);
        }
        matrix.push(row);
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
    if(vertical){
        let y = line[0][1];
        for (let c = Xmin; c <= Xmax; c++) {
            matrix[c][y] += 1;
        }
        return matrix;
    }
    // part 2
    let slope = ((y2 - y1) / (x2 - x1));
    let steps = Xmax-Xmin;
    //console.log('slope = '+slope)
    if (slope == 1) {
        for (let p = 0; p<=steps; p++) {
            matrix[Xmin+p][Ymin+p] += 1
        }
        return matrix;
    }

    if (slope == -1) {
        for (let p = 0; p<=steps; p++) {
            matrix[Xmin + p][Ymax - p] += 1
        }
        return matrix;
    }
    //return matrix;
}

function countOverlappingLines(matrix){
    let count = 0;
    let m_size = matrix.length;
    for (let x = 0; x < m_size; x++) {
        for (let y = 0; y < m_size; y++) {
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
        let line = createEndPoints(rawInput[p]);
        endPointList.push(line);
    }


    let filteredEndPointList = endPointList.filter(pair => pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]);
    log(`endpoint list length: ${endPointList.length}`);
    log(`filtered length: ${filteredEndPointList.length}`);
    console.table(filteredEndPointList)


    let matrix = generateMatrix(SIZE,SIZE,0);
    //console.table(matrix);
    for (let k = 0; k < filteredEndPointList.length; k++) {
        let line = filteredEndPointList[k];
        matrix = AddPointsToMatrix(matrix,line);
    }

    log(`------ THE COUNT ------`)
    log(`${countOverlappingLines(matrix)}`);
    //console.table(matrix);
}

function part2() {
    
    let endPointList = [];
    for (let p = 0; p < rawInput.length; p++) {
        let line = createEndPoints(rawInput[p]);
        endPointList.push(line);
    }

    let matrix = generateMatrix(SIZE, SIZE, 0);
    //console.table(matrix);
    for (let k = 0; k < endPointList.length; k++) {
        let line = endPointList[k];
        matrix = AddPointsToMatrix(matrix, line);
    }

    log(`------ THE COUNT ------`)
    log(`${countOverlappingLines(matrix)}`);
    //console.table(matrix);
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