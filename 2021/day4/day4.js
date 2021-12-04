"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var numbersCalled = (0, common_1.inputToNumberArray)('nums.txt', ',');
var bingoCards = (0, common_1.inputToStringArray)('boards.txt', '\n');
//console.table(rawInput);
function createMatrix(stringArray) {
    var len = stringArray.length;
    var matrix = [];
    for (var r = 0; r < len; r++) {
        var rowText = stringArray[r];
        rowText = rowText.trim();
        rowText = rowText.replace("  ", " ");
        var row = rowText.split(" ");
        row = row.map(function (v) { return parseInt(v); });
        matrix.push(row);
    }
    return matrix;
}
function listOfMatricies(input, matrixSize) {
    var len = input.length;
    var rowIndex = 0;
    // can fit in a new matrix
    var listOfMatrices = [];
    while (true) {
        if (rowIndex + matrixSize > len) {
            break;
        }
        var m = [];
        for (var s = rowIndex; s < rowIndex + matrixSize; s++) {
            m.push(input[s]);
        }
        var matrix = createMatrix(m);
        listOfMatrices.push(matrix);
        rowIndex += matrixSize + 1;
    }
    return listOfMatrices;
}
// Bingo Board Indexes
/**
 *  0  1  2  3  4
 *  5  6  7  8  9
 * 10 11 12 13 14
 * 15 16 17 18 19
 * 20 21 22 23 24
 */
function hasWinningRow(bingoIndexSet, boardSize) {
    for (var row = 0; row < boardSize; row++) {
        var win = true;
        for (var column = 0; column < boardSize; column++) {
            win = win && bingoIndexSet.has(row * boardSize + column);
        }
        if (win) {
            return row;
        }
    }
    return -1;
}
function hasWinningcolumn(bingoIndexSet, boardSize) {
    for (var column = 0; column < boardSize; column++) {
        var win = true;
        for (var row = 0; row < boardSize; row++) {
            win = win && bingoIndexSet.has(row * boardSize + column);
        }
        if (win) {
            return column;
        }
    }
    return -1;
}
function getBingoIndex(bingoMatrix, value) {
    var boardSize = bingoMatrix.length;
    for (var row = 0; row < boardSize; row++) {
        for (var column = 0; column < boardSize; column++) {
            if (bingoMatrix[row][column] == value) {
                return (row * boardSize + column);
            }
        }
    }
    return -1;
}
function testBoard(bingoMatrix, gameInstructions) {
    var markedIndices = new Set();
    for (var i = 0; i < gameInstructions.length; i++) {
        var index = getBingoIndex(bingoMatrix, gameInstructions[i]);
        if (index > 0) {
            markedIndices.add(index);
        }
        var wonRow = hasWinningRow(markedIndices, bingoMatrix.length);
        if (wonRow > 0) {
            return {
                board: bingoMatrix,
                moves: i + 1,
                indices: Array.from(markedIndices)
            };
        }
        var wonColumn = hasWinningcolumn(markedIndices, bingoMatrix.length);
        if (wonColumn > 0) {
            return {
                board: bingoMatrix,
                moves: i + 1,
                indices: Array.from(markedIndices)
            };
        }
    }
    return {
        board: null,
        moves: -1,
        indices: []
    };
}
function calculateScore(boardState) {
    var board = boardState.board;
    var marked = boardState.indices;
    var lastMove = numbersCalled[boardState.moves - 1];
    var boardSize = board.length;
    var sum = 0;
    for (var row = 0; row < boardSize; row++) {
        for (var column = 0; column < boardSize; column++) {
            if (!marked.includes(row * boardSize + column)) {
                sum += board[row][column];
            }
        }
    }
    log("sum = ".concat(sum));
    log("last move = ".concat(lastMove));
    return sum * lastMove;
}
function part1() {
    log(numbersCalled);
    var boards = listOfMatricies(bingoCards, 5);
    log("number of matrices = ".concat(boards.length));
    //log(numbersCalled);
    //console.table(boards[0]);
    var listOfBoardStates = [];
    for (var b = 0; b < boards.length; b++) {
        //console.table(boards[b]);
        listOfBoardStates.push(testBoard(boards[b], numbersCalled));
    }
    //console.table(listOfBoardStates);
    var minBoard = listOfBoardStates[0];
    for (var b = 1; b < boards.length; b++) {
        if (listOfBoardStates[b].moves > 0 && listOfBoardStates[b].moves < minBoard.moves) {
            minBoard = listOfBoardStates[b];
        }
    }
    log("The Winning Baord");
    log("-----------------");
    console.table(minBoard.board);
    log("Moves: " + minBoard.moves);
    log("with indices...");
    console.table(minBoard.indices);
    //log(typeof minBoard.indices);
    //log(Array.isArray(minBoard.indices));
    var score = calculateScore(minBoard);
    log("SCORE = ".concat(score));
}
function part2() {
    //answer
    log();
}
// main method to run the program
function main(first, second) {
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
