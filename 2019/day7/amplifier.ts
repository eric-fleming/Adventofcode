/*Dependent Modules*/
import { AmpCodeComputer } from './ampCodeComputer';

export class Amplifier{

    private inputSignal: number;
    private outputSignal: number;
    private intCodeComputer: AmpCodeComputer;
    private opcodeFileName: string;
    private phaseSetting: number;
    //private nextAmplifier: any; // could be Amp || null

    constructor(ps: number, inputVal: number, file: string){
        this.phaseSetting = ps;
        this.inputSignal = inputVal;
        this.opcodeFileName = file;
        
    }

    initialize(){
        this.intCodeComputer = new AmpCodeComputer(); 
        this.intCodeComputer.loadInstructions(this.phaseSetting, this.inputSignal, this.opcodeFileName);
    }

    getOutputSignal(){
        return this.outputSignal;
    }

    run(){
        //console.log(`started Amp`);
        this.initialize();
        this.intCodeComputer.run();
        this.outputSignal = this.intCodeComputer.run();
        if (this.outputSignal === undefined){
            console.log(`no output calculated`);
        }

    }

}