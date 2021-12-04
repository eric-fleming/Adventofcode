/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;

const numbersCalled = inputToNumberArray('nums.txt', ',');
const bingoCards = inputToStringArray('boards.txt','\n');

//console.table(rawInput);

function createMatrix(stringArray){
    let len = stringArray.length;

    let matrix = [];
    for(let r=0; r<len;r++){
        let rowText = stringArray[r];
        rowText = rowText.trim();
        rowText =rowText.replace("  "," ");
        let row = rowText.split(" ");
        row = row.map( v => parseInt(v));
        matrix.push(row);
    }

    return matrix;
}

function listOfMatricies(input,matrixSize){
    let len = input.length;
    
    let rowIndex = 0;
    // can fit in a new matrix
    let listOfMatrices = [];

    while (true){

        if (rowIndex + matrixSize > len) {
            break;
        }

        let m = []
        for (let s = rowIndex; s <rowIndex+matrixSize;s++){
            m.push(input[s]);
        }
        let matrix = createMatrix(m);
        listOfMatrices.push(matrix);
        rowIndex += matrixSize+1;

        
    }

    return listOfMatrices

}

// Bingo Board Indexes
/**
 *  0  1  2  3  4
 *  5  6  7  8  9
 * 10 11 12 13 14
 * 15 16 17 18 19
 * 20 21 22 23 24
 */

function hasWinningRow(bingoIndexSet,boardSize){
    for(let row=0;row<boardSize;row++){
        let win = true;
        for(let column=0;column<boardSize;column++){
            win = win && bingoIndexSet.has(row*boardSize+column);
        }
        if(win){
            return row;
        }
    }
    return -1;
}

function hasWinningcolumn(bingoIndexSet, boardSize) {
    for (let column = 0; column < boardSize; column++) {
        let win = true;
        for (let row = 0; row < boardSize; row++) {
            win = win && bingoIndexSet.has(row * boardSize + column);
        }
        if (win) {
            return column;
        }
    }
    return -1;
}

function getBingoIndex(bingoMatrix, value){

    let boardSize = bingoMatrix.length;

    for (let row = 0; row < boardSize; row++){
        for (let column = 0; column < boardSize; column++){
            if(bingoMatrix[row][column] == value){
                return (row * boardSize + column);
            }
        }
    }
    return -1;
}



function testBoard(bingoMatrix,gameInstructions){

    let markedIndices = new Set();

    for(let i=0; i<gameInstructions.length;i++){
        let index = getBingoIndex(bingoMatrix,gameInstructions[i]);
        if(index > 0){
            markedIndices.add(index);
        }

        let wonRow = hasWinningRow(markedIndices, bingoMatrix.length);
        if (wonRow > 0) {
            return {
                board: bingoMatrix,
                moves:i+1,
                indices: Array.from(markedIndices)
            }
        }

        let wonColumn = hasWinningcolumn(markedIndices, bingoMatrix.length);
        if (wonColumn > 0) {
            return {
                board: bingoMatrix,
                moves: i + 1,
                indices: Array.from(markedIndices)
            }
        }
    }

    return {
        board:null,
        moves:-1,
        indices: []
    }

}

function calculateScore(boardState) {
    let board = boardState.board;
    let marked = boardState.indices;

    let lastMove = numbersCalled[boardState.moves-1];
    let boardSize = board.length;
    let sum = 0;

    for (let row = 0; row < boardSize; row++) {
        for (let column = 0; column < boardSize; column++) {
            if (!marked.includes(row * boardSize + column)) {
                sum += board[row][column];
            }
        }
    }
    log(`sum = ${sum}`);
    log(`last move = ${lastMove}`);
    return sum * lastMove;

}

function part1() {
    log(numbersCalled);
    
    let boards = listOfMatricies(bingoCards,5);
    log(`number of matrices = ${boards.length}`);
    //log(numbersCalled);
    //console.table(boards[0]);


    let listOfBoardStates = [];
    for (let b=0;b<boards.length;b++) {
        //console.table(boards[b]);
        listOfBoardStates.push(testBoard(boards[b], numbersCalled))
    }

    //console.table(listOfBoardStates);

    let minBoard = listOfBoardStates[0];
    for (let b = 1; b < boards.length; b++){
        if (listOfBoardStates[b].moves > 0 && listOfBoardStates[b].moves < minBoard.moves){
            minBoard = listOfBoardStates[b];
        }
    }

    log("The Winning Baord");
    log("-----------------")
    console.table(minBoard.board);
    log("Moves: "+minBoard.moves);
    log("with indices...");
    console.table(minBoard.indices);
    //log(typeof minBoard.indices);
    //log(Array.isArray(minBoard.indices));
    
    let score = calculateScore(minBoard);
    log(`SCORE = ${score}`);
    
}




function part2() {

    log(numbersCalled);

    let boards = listOfMatricies(bingoCards, 5);
    log(`number of matrices = ${boards.length}`);
    //log(numbersCalled);
    //console.table(boards[0]);


    let listOfBoardStates = [];
    for (let b = 0; b < boards.length; b++) {
        //console.table(boards[b]);
        listOfBoardStates.push(testBoard(boards[b], numbersCalled))
    }

    //console.table(listOfBoardStates);

    let maxBoard = listOfBoardStates[0];
    for (let b = 1; b < boards.length; b++) {
        if (listOfBoardStates[b].moves > 0 && listOfBoardStates[b].moves > maxBoard.moves) {
            maxBoard = listOfBoardStates[b];
        }
    }

    log("The Winning Baord");
    log("-----------------")
    console.table(maxBoard.board);
    log("Moves: " + maxBoard.moves);
    log("with indices...");
    console.table(maxBoard.indices);
    //log(typeof minBoard.indices);
    //log(Array.isArray(minBoard.indices));

    let score = calculateScore(maxBoard);
    log(`SCORE = ${score}`);
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

main(false, true);