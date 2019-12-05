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
        this.input = inputVal; // 1 or 5
    }


    // if the mode is 1, pass by value
    // if the mode is 0, pass by reference
    private loadParamFromMem(opcode_idx: number, instruction: OpCodeInstruction, paramInt: number) {
        let paramMode: number = instruction['p' + paramInt];
        console.log(`param mode is = ${paramMode}`);
        if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        } else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    }

    private loadRegistersFromMem(pc: number, instruction: OpCodeInstruction) {
        //staging the locations
        let registers = [instruction.getAction()];
        // old
        // load params
        if (instruction['p1'] === 1) {
            registers[1] = this.memory[pc + 1];
        } else if (instruction['p1'] === 0) {
            registers[1] = this.memory[this.memory[pc + 1]];
        }
        if (instruction['p2'] === 1) {
            registers[2] = this.memory[pc + 2];
        } else if (instruction['p2'] === 0) {
            registers[2] = this.memory[this.memory[pc + 2]];
        }
        // always a pointer
        if (instruction['p3'] === 1) {
            registers[3] = this.memory[pc + 3];
        } else if (instruction['p3'] === 0) {
            registers[3] = this.memory[pc + 3];
        }

        return registers;
    }

    // executes the instruction one the memory
    applyOpCode(pc: number, instruction: OpCodeInstruction){
        // registers === [action, p1, p2, p3]
        // with the correct values for processing
        let registers = this.loadRegistersFromMem(pc, instruction);
        //console.log('--- registers ---');
        //console.table(registers);
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
            if(instruction.p1 === 0){
                // param mode 0 : pass by ref
                this.memory[this.memory[pc + 1]] = this.input;
            }
            else{
                // param mode 1 : pass by value
                this.input = this.memory[pc + 1];
            }
            
            return 0;

        }
        else if (action === 4) {
            // treat the input as a reference
            console.log(`output : ${registers[1]}`);
            return 0;

        }
        else if (action === 5 && registers[1] !== 0) {
            return registers[2];
        }
        else if (action === 6 && registers[1] === 0) {
            return registers[2];
        }
        else if (action === 7) {
            if (registers[1] < registers[2]) {
                this.memory[registers[3]] = 1;
            } else {
                this.memory[registers[3]] = 0;
            }
        }
        else if (action === 8) {
            if (registers[1] === registers[2]) {
                this.memory[registers[3]] = 1;
            } else {
                this.memory[registers[3]] = 0;
            }
        }
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
            //console.log(`PC: ${this.programCounter};    memory[225] = ${this.memory[225]}`);
            let instruction = new OpCodeInstruction(code, this.programCounter);
            //console.log('--- instruction ---');
            //console.table(instruction);
            increment = instruction.getJump();
            
            // Handles the instruction: FINISH IMPLEMENTATION ABOVE
            let override = this.applyOpCode(this.programCounter, instruction);
            
            // prepare for next instruction
            if(override === 0){
                this.programCounter += increment;
            }
            else if (override > 0) {
                this.programCounter = override;
            }
            else{
                // override === -1
                console.log()
                break;
            }
        }
        
    }

}


function testIntCodeComputer(init:number){
    const Computer = new IntCodeComputer();
    Computer.loadInstructions(init);
    Computer.run();
}

testIntCodeComputer(1);











/*


// if the mode is 1, pass by value
    // if the mode is 0, pass by reference
    private loadParamFromMem(opcode_idx: number, instruction: OpCodeInstruction, paramInt: number) {
        let paramMode: number = instruction['p' + paramInt];
        console.log(`param mode is = ${paramMode}`);
        if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        } else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    }

    private loadRegistersFromMem(pc: number, instruction: OpCodeInstruction) {
        //staging the locations
        let registers = [instruction.getAction()];

        // load the params
        for (let i = 1; i < 4; i++) {
            console.log(`has param ${i}? => ${instruction['p' + i] !== undefined}`);
            if (instruction['p' + i] !== undefined) {
                registers[i] = this.loadParamFromMem(pc, instruction, i);
            }
        }

        return registers;
    }



 */