/*Dependent Modules*/
import { readInput } from '../shared_functions/common';
import { IntCodeComputer } from '../day5/intCodeComputer';
const rawInput = readInput('day7input.txt');


export class Amplifier{

    private inputSignal: number;
    private outputSignal: number;
    private intCodeComputer: IntCodeComputer;
    private opcodeFileName: string;
    private phaseSetting: number;
    //private nextAmplifier: any; // could be Amp || null

    constructor(ps: number, inputVal: number, file: string){
        this.phaseSetting = ps;
        this.inputSignal = inputVal;
        this.opcodeFileName = file;
        
    }

    initialize(){
        this.intCodeComputer = new IntCodeComputer(); 
        this.intCodeComputer.loadInstructions(this.inputSignal, this.opcodeFileName);
    }

    getOutputSignal(){
        return this.outputSignal;
    }

    run(){
        console.log(`started Amp`);
        this.initialize();
        this.outputSignal = this.intCodeComputer.run();
        if (this.outputSignal !== undefined){
            console.log(`obtained output`);
        }
        else{
            console.log(`no output calculated`);
        }

    }

}