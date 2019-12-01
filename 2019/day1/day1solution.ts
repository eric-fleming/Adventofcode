/*Dependent Modules*/
import {readInput, inputToArray} from '../shared_functions/common';

const calculation = (fuel) => {
    if (fuel > 0) {
        return Math.floor(fuel / 3) - 2;
    }
    else {
        // The last character in list === 0 which means EOL but needs to stay 0 to not affect the sum
        return 0;
    }
};
const sum = (a: number, b: number) => a + b;

function FuelRequired(fuelModules: number[]): number {
    fuelModules = fuelModules.map(calculation);
    const totalFuel = fuelModules.reduce(sum,0);
    return totalFuel;
}

function firstChallenge(){
    const inputNumberArray = inputToArray(readInput('day1input.txt'),'number');
    const total = FuelRequired(inputNumberArray);
    console.log(`The total amount of fuel is : ${total}`);
}

function secondChallenge(){
    const inputNumberArray = inputToArray(readInput('day1input.txt'), 'number');
    let fuelInception = [];
    let fuelModuletotal = 0;
    for(let f=0;f<inputNumberArray.length;f++){
        let tempFuel = inputNumberArray[f];
        fuelInception[f] = 0;
        while(tempFuel >= 6){
            tempFuel = calculation(tempFuel);
            fuelInception[f] += tempFuel;
            //console.log('put in : '+tempFuel);
        }
        //console.log('------ next fuel module -------');
    }
    fuelModuletotal = fuelInception.reduce(sum, 0);
    console.log(`The Recursive Fuel Total is : ${fuelModuletotal}`);
}

firstChallenge();
secondChallenge();
