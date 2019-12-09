/*Dependent Modules*/
import { readInput } from '../shared_functions/common';
import { generatePermutations } from './phasecodes';
import { Amplifier } from './amplifier';
const rawInput = readInput('day7input.txt');


function firstChallenge(numOfAmplifiers: number, seed: number, fileName: string) { 
    const phasecodes = generatePermutations(numOfAmplifiers,seed);
    //console.table(phasecodes);
    
    let trusterOutputs:number[] = [];

    for (let p = 0; p < phasecodes.length; p++){
        let nextInputSignal = 0; // set this to the next outputSignal
        let lastOutput;

        for (let a = 0; a < numOfAmplifiers; a++) {
            let phaseSetting = phasecodes[p][a];
            let Amp = new Amplifier(phaseSetting, nextInputSignal, fileName);
            Amp.run();
            nextInputSignal = Amp.getOutputSignal();
            if(a === (numOfAmplifiers -1)){
                lastOutput = nextInputSignal;
            }
        }
        trusterOutputs.push(lastOutput);
        //console.log(`---- Next Phase Code ----`);
    }

    console.table(trusterOutputs);
    
    // trusterOuput list is complete, find max.
    const max = Math.max(...trusterOutputs);
    console.log(`=========================================`);
    console.log(`The maximum Truster Output is ${max}`);
    console.log(`=========================================`);
}




function secondChallenge(numOfAmplifiers: number, seed: number, fileName: string) { 
    const phasecodes = generatePermutations(numOfAmplifiers, seed);
    //console.table(phasecodes);

    let trusterOutputs: number[] = [];
    loop1:
    for (let p = 0; p < phasecodes.length; p++) {
        let nextInputSignal = 0; // set this to the next outputSignal
        let lastOutput;
        loop2:
        for (let a = 0; a < numOfAmplifiers; a++) {
            // set up
            let phaseSetting = phasecodes[p][a];
            let currentInput = nextInputSignal;

            // calculate next output, future input
            let Amp = new Amplifier(phaseSetting, currentInput, fileName);
            Amp.run();
            nextInputSignal = Amp.getOutputSignal();

            // halting condition??
            if (nextInputSignal === undefined) {
                lastOutput = currentInput;
                break loop2;
            }
            // if you've reached Amp E
            if (a === (numOfAmplifiers - 1)) {
                lastOutput = nextInputSignal;
                // go around again.
                a=0;
            }
        }
        trusterOutputs.push(lastOutput);
        //console.log(`---- Next Phase Code ----`);
    }

    console.table(trusterOutputs);

    // trusterOuput list is complete, find max.
    const max = Math.max(...trusterOutputs);
    console.log(`=========================================`);
    console.log(`The maximum Truster Output is ${max}`);
    console.log(`=========================================`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    // parameters
    // challenge (number of amps, seed value for phase settings, opcode instructions)
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge(5, 0, 'day7input.txt');
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge(5, 5, 'day7input.txt');
        console.log('------  Challend Completed -----------');
    }
}

main(false, true);


