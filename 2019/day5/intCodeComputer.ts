/* Dependent Modules */
import { readInput, inputToArray } from '../shared_functions/common';
import { OpCodeInstruction } from './opCodeInstruction';

export class IntCodeComputer{

    private memory: number[];
    private programCounter: number;
    private input: number;

    constructor(){
        this.programCounter = 0;
        this.memory = [];
    }

    loadInstructions(inputVal: number){
        const rawInput = readInput('day5input.txt');
        this.memory = inputToArray(rawInput, 'number', ',');
        this.input = inputVal; //1
    }
}