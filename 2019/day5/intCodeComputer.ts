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

    // initializes the object
    loadInstructions(inputVal: number){
        const rawInput = readInput('day5input.txt');
        this.memory = inputToArray(rawInput, 'number', ',');
        this.input = inputVal; //1
    }

    // executes the instruction one the memory
    applyOpCode(instruction: OpCodeInstruction){
        return 1234;
    }

    // executes the program
    run(){
        if(!this.input){
            console.error(`You have not loaded any instructions or initialized the input...`);
        }

        let maxLength = this.memory.length;
        let increment: number;// for moving the programCounter

        // begin
        while (this.programCounter < maxLength) {
            // Extract IntCode and make Instruction Object
            let code = this.memory[this.programCounter];
            let instruction = new OpCodeInstruction(code);
            let override: number;// for jumping through the memory instead of incrementing

            // *********** IMPLEMENT TODO ************** //
            // Handles the instruction
            override = this.applyOpCode(instruction);
            // *********** END TODO ************** //

            //console.log(`completed opcode index ${c} with ${optype}`);
            this.programCounter += increment;

            // this value will exist if something is output from a jump call
            // the index of the jump is override
            if (!!override) {
                this.programCounter = override;
            }
        }
        
    }

    // cut out old code for reference while I implement new design
    oldRun(){
        // Extract IntCode and make Instruction Object
        let code = this.memory[this.programCounter];
        let instruction = new OpCodeInstruction(code);
        let action = instruction.action;
        let increment: number;// for moving the programCounter
        
        let override: number; // for jumping through the memory instead of incrementing
        if (action === 99) {
            console.log('-- HALT --');
        }
        else if (assemblyOpCode(instruction)) {
            // set for-loop incrementer
            increment = instruction.jump;
            override = applyAssemblyOpCode(this.programCounter, instruction);
        }
        else if (oldOpCode(instruction)) {
            applyOldOpCode(c);
            // set for-loop incrementer
            if (action === 1 || action === 2) { increment = 4; }
            else if (action === 3 || action === 4) { increment = 2; }
        }
        else if (newOpCode(instruction)) {
            // set for-loop incrementer
            increment = instruction.jump;
            // select and perform action
            applyNewOpCode(this.programCounter, instruction);
        }
        else {
            console.log(`Error: unknown op-code!\n Found at index ${this.programCounter}\n`);
            console.table(instruction);
        }
    }
}