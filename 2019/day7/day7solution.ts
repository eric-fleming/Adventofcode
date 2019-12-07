/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared_functions/common';
import { IntCodeComputer } from '../day5/intCodeComputer';
import { generatePermutations } from './phasecodes';
const rawInput = readInput('day7input.txt');


function firstChallenge(numOfAmplifiers:number) { 
    const phasecodes = generatePermutations(numOfAmplifiers);
    //console.table(phasecodes);
    
    const Computer = new IntCodeComputer();
    
    for (let p = 0; p < phasecodes.length; p++){
        for (let a = 0; a < numOfAmplifiers; a++) {
            let input = phasecodes[p][a];
            
        } 
    }
    
    //Computer.loadInstructions(permuation, 'day7input.txt');
    //Computer.run();
    //Computer.reset();


}




function secondChallenge() { }

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(5);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}

main(true, false);
