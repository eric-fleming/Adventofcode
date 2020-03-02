/* Dependent Modules */
import { readInput, inputToArray } from '../shared_functions/common';
import { OpCodeInstruction } from '../day5/opCodeInstruction';

export class RelativeIntCodeComputer {

    private memory: number[];
    private programCounter: number;
    private relativeBase: number; // for day 9
    private input: number;
    private output: number[]; // for day 7

    constructor() {
        this.programCounter = 0;
        this.relativeBase = 0;
        this.memory = [];
    }


    // clears the computer to be used again;
    reset() {
        this.programCounter = 0;
        this.relativeBase = 0;
        this.memory = [];
        this.input = undefined;
        this.output = [];
    }


    // initializes the object
    loadInstructions(inputVal: number, file: string) {
        this.reset();
        const rawInput = readInput(file);
        this.memory = inputToArray(rawInput, 'number', ',');
        //console.table(this.memory);
        let len = this.memory.length;
        let big = 10000000;
        console.log('filling with lots of zeros...');
        for(let i = len; i< big;i++){
            this.memory[i] = 0;
        }
        this.input = inputVal;
    }


    // if the mode is 0, pass by reference
    // if the mode is 1, pass by value
    // if the mode is 2, reference the relativeBase
    private loadParamFromMem(opcode_idx: number, instruction: OpCodeInstruction, paramInt: number) {
        // not safe for p3 since it does not always pull info from the memory array.
        let paramMode: number = instruction['p' + paramInt];
        if (paramMode === 2){
            let relativeShift = this.memory[opcode_idx + paramInt];
            return this.memory[this.relativeBase + relativeShift];
        }
        else if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        }
        else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    }




    // supposed to call the method above to dynamically load the data
    // I had many errors so I postponed working on it and just repeated myself
    private loadRegistersFromMem(pc: number, instruction: OpCodeInstruction) {
        //staging the locations
        let registers = [instruction.getAction()];

        // load the params
        for (let i = 1; i < 4; i++) {
            //console.log(`has param ${i}? => ${instruction['p' + i] !== undefined}`);
            let pindex = 'p' + i;
            if (instruction[pindex] !== undefined) {
                // the output
                if (i === 3) {
                    if (instruction.p3 === 0) { 
                        registers[i] = this.memory[pc + i];
                    }
                    if (instruction.p3 === 1) { 
                        //should never happen
                        registers[i] = this.memory[pc + i];
                    }
                    if (instruction.p3 === 2) { 
                        registers[i] = this.memory[this.relativeBase + this.memory[pc + i]];
                    }
                }
                // not the output
                else {
                    registers[i] = this.loadParamFromMem(pc, instruction, i);
                }
            }
        }
        //console.log('--- registers ---');
        //console.table(registers);
        return registers;
    }

    // executes the instruction one the memory
    private applyOpCode(pc: number, instruction: OpCodeInstruction) {
        // registers === [action, p1, p2, p3]
        // with the correct values for processing
        let registers = this.loadRegistersFromMem(pc, instruction);
        // decide and execute
        let action = registers[0];
        if (action === 99) {
            console.log('--- HALT: opcode 99 ---');
            return -1;
        }

        else if (action === 1) {
            this.memory[registers[3]] = registers[1] + registers[2];
            return 0;
        }

        else if (action === 2) {
            this.memory[registers[3]] = registers[1] * registers[2];
            return 0;
        }

        else if (action === 3) {
            // supposed to prompt but I just cached it
            if (instruction.p1 === 0) {
                // param mode 0 : pass by ref
                this.memory[this.memory[pc + 1]] = this.input;
            }
            else if (instruction.p1 === 1) {
                // param mode 1 : pass by value
                // not possible
                this.memory[this.memory[pc + 1]] = this.input;
            }
            else if (instruction.p1 === 2){
                // param mode 2: relative
                this.memory[this.relativeBase + this.memory[pc + 1]] = this.input;
            }
            return 0;
        }

        else if (action === 4) {
            if (instruction.p1 === 0) {
                // param mode 0 : pass by ref
                console.log(`output (by ref) : ${this.memory[this.memory[pc + 1]]}`);
                this.output.push(this.memory[this.memory[pc + 1]]);
            }
            else if(instruction.p1 === 1) {
                // param mode 1 : pass by value
                console.log(`output (by val) : ${this.memory[pc + 1]}`);
                this.output.push(this.memory[pc + 1]);
            }
            else if (instruction.p1 === 2) {
                // param mode 0 : pass by ref
                console.log(`output (by rel ref) : ${this.memory[this.relativeBase + this.memory[pc + 1]]}`);
                this.output.push(this.memory[this.relativeBase + this.memory[pc + 1]]);
            }
            return 0;
        }

        else if (action === 5) {
            if (registers[1] !== 0) {
                // jump to new pc
                return registers[2];
            }
            else {
                // increment as usual
                return 0;
            }

        }

        else if (action === 6) {
            if (registers[1] === 0) {
                // jump to new pc
                return registers[2];
            }
            else {
                // increment as usual
                return 0;
            }
        }

        else if (action === 7) {
            if (registers[1] < registers[2]) {
                this.memory[registers[3]] = 1;
            } else {
                this.memory[registers[3]] = 0;
            }
            return 0;
        }

        else if (action === 8) {
            if (registers[1] === registers[2]) {
                this.memory[registers[3]] = 1;
            } else {
                this.memory[registers[3]] = 0;
            }
            return 0;
        }
        else if(action === 9){
            // add parameter to the relative base.
            if (instruction.p1 === 0) { 
                this.relativeBase += this.memory[this.memory[pc + 1]]
            }
            if (instruction.p1 === 1) { 
                this.relativeBase += this.memory[pc + 1];
            }
            if (instruction.p1 === 2) { 
                this.relativeBase += this.memory[this.relativeBase + this.memory[pc + 1]]
            }
            return 0;
        }
    }

    // executes the program
    run() {
        if (this.input === undefined) {
            console.error(`You have not loaded any instructions or initialized the input...`);
        }

        let maxLength = this.memory.length;
        let increment: number;// for moving the programCounter

        // begin
        while (this.programCounter < maxLength) {
            // Extract IntCode and make Instruction Object
            let code = this.memory[this.programCounter];
            let instruction = new OpCodeInstruction(code, this.programCounter);
            console.table(instruction);
            increment = instruction.getJump();

            // Handles the instruction: FINISH IMPLEMENTATION ABOVE
            let override = this.applyOpCode(this.programCounter, instruction);

            // prepare for next instruction
            if (override === 0) {
                this.programCounter += increment;
            }
            else if (override > 0) {
                this.programCounter = override;
            }
            else {
                // override === -1
                console.log('--------------- terminates regularly');
                break;
            }
        }
        return this.output;

    }//end of run()


}// end of class


// main method to run the program
function main(init1: number, init2: number) {
    const Computer = new RelativeIntCodeComputer();
    if (init1 !== 0) {
        console.log('------  First Challenge Started -----');
        Computer.loadInstructions(init1, 'day9input.txt');
        let output = Computer.run();
        console.log(`output is = ${output}`);
        console.log('------  Challend Completed -----------\n\n');
    }
    if (init2 !== 0) {
        console.log('\n\n------  Second Challenge Started -----');
        Computer.loadInstructions(init2, 'day9input.txt');
        Computer.run();
        console.log('------  Challend Completed -----------');
    }
}

main(1, 0);