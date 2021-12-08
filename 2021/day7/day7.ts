/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToNumberArray('day7.input.txt', ',');
console.table(rawInput);

function linearSumationFuelCost(distance:number){
    return (distance+1)*distance/2;
}

function calculateLinearFuelexpenditure(list: number[], median){
    let fuelTotal = 0;
    list.forEach(posisition => {
        fuelTotal += linearSumationFuelCost(Math.abs(posisition - median));
    });
    return fuelTotal;
}

function calculateFuel(list:number[],median){
    let fuelTotal = 0;
    list.forEach(posisition => {
        fuelTotal += Math.abs(posisition-median);
    });
    return fuelTotal;
}

function part1() {
    let horizontalPositions = [...rawInput];
    
    horizontalPositions = horizontalPositions.sort((a,b) => a-b);
 
    let medianIndex = Math.floor(horizontalPositions.length / 2);
    let leftFuelCost = calculateFuel(horizontalPositions, horizontalPositions[medianIndex-1]);
    let rightFuelCost = calculateFuel(horizontalPositions, horizontalPositions[medianIndex]);

    log(`${Math.min(leftFuelCost, rightFuelCost)}`);
}

function part2() {
    let horizontalPositions:number[] = [...rawInput];
    horizontalPositions = horizontalPositions.sort((a, b) => a - b);

    let average = horizontalPositions.reduce((a,b) => a+b)/horizontalPositions.length;
    log(`the average is ${average}`);

    let leftAverage = Math.floor(average);
    let rightAverage = Math.ceil(average);

    let leftFuelCost = calculateLinearFuelexpenditure(horizontalPositions,leftAverage);
    let rightFuelCost = calculateLinearFuelexpenditure(horizontalPositions, rightAverage);
    

    log(`${Math.min(leftFuelCost, rightFuelCost)}`);
    
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