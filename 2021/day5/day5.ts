/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day5input.txt', '\r\n');
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
    let horizontal = line[0][0] == line[1][0];
    let vertical = line[0][1] == line[1][1];
    if(horizontal){
        let x = line[0][0];
        let y1 = line[0][1];
        let y2 = line[1][1];
        let dir = y2-y1;
        for(let c=y1; c<=y2; c++){
            matrix[x][c] += 1;
        }
    }
    if(vertical){

    }

    return matrix;
}

function part1() {

    let endPointList = [];
    for(let p=0; p < rawInput.length; p++){
        let line = createEndPoints(rawInput[p]);
        endPointList.push(line);
    }
    log(endPointList[0]);

    let filteredEndPointList = endPointList.filter(pair => pair[0][0] == pair[1][0] || pair[0][1] == pair[1][1]);
    log(`endpoint list length: ${endPointList.length}`);
    log(`filtered length: ${filteredEndPointList.length}`);

    let matrix = generateMatrix(999,999,0);
    //console.table(matrix);
    for (let k = 0; k < endPointList.length; k++) {
        let line = endPointList[k];
        matrix = AddPointsToMatrix(matrix,line);
    }



    let answer;
    log(`${answer}`);
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