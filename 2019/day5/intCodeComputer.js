"use strict";
exports.__esModule = true;
/* Dependent Modules */
var common_1 = require("../shared_functions/common");
var opCodeInstruction_1 = require("./opCodeInstruction");
var IntCodeComputer = /** @class */ (function () {
    function IntCodeComputer() {
        this.programCounter = 0;
        this.memory = [];
    }
    // initializes the object
    IntCodeComputer.prototype.loadInstructions = function (inputVal) {
        var rawInput = common_1.readInput('day5input.txt');
        this.memory = common_1.inputToArray(rawInput, 'number', ',');
        this.input = inputVal; // 1 or 5
    };
    // if the mode is 1, pass by value
    // if the mode is 0, pass by reference
    IntCodeComputer.prototype.loadParamFromMem = function (opcode_idx, instruction, paramInt) {
        var paramMode = instruction['p' + paramInt];
        console.log("param mode is = " + paramMode);
        if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        }
        else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    };
    IntCodeComputer.prototype.loadRegistersFromMem = function (pc, instruction) {
        //staging the locations
        var registers = [instruction.getAction()];
        // old
        // load params
        if (instruction['p1'] === 1) {
            registers[1] = this.memory[pc + 1];
        }
        else if (instruction['p1'] === 0) {
            registers[1] = this.memory[this.memory[pc + 1]];
        }
        if (instruction['p2'] === 1) {
            registers[2] = this.memory[pc + 2];
        }
        else if (instruction['p2'] === 0) {
            registers[2] = this.memory[this.memory[pc + 2]];
        }
        // always a pointer
        if (instruction['p3'] === 1) {
            registers[3] = this.memory[pc + 3];
        }
        else if (instruction['p3'] === 0) {
            registers[3] = this.memory[pc + 3];
        }
        return registers;
    };
    // executes the instruction one the memory
    IntCodeComputer.prototype.applyOpCode = function (pc, instruction) {
        // registers === [action, p1, p2, p3]
        // with the correct values for processing
        var registers = this.loadRegistersFromMem(pc, instruction);
        console.log('--- registers ---');
        console.table(registers);
        // decide and execute
        var action = registers[0];
        if (action === 99) {
            console.log('--- HALT: opcode 99 ---');
            return -1;
        }
        else if (action === 1) {
            console.log('Add');
            this.memory[registers[3]] = this.memory[registers[1]] + this.memory[registers[2]];
            return 0;
        }
        else if (action === 2) {
            console.log('Multiply');
            this.memory[registers[3]] = this.memory[registers[1]] * this.memory[registers[2]];
            return 0;
        }
        else if (action === 3) {
            console.log('Input');
            // supposed to prompt but I just cached it
            if (registers[1] === 0) {
                // param mode 0 : pass by ref
                this.memory[registers[1]] = this.input;
            }
            else {
                // param mode 1 : pass by value
                this.input = this.memory[registers[1]];
            }
            return 0;
        }
        else if (action === 4) {
            // treat the input as a reference
            console.log("output : " + this.memory[registers[1]]);
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
            }
            else {
                this.memory[registers[3]] = 0;
            }
        }
        else if (action === 8) {
            if (registers[1] === registers[2]) {
                this.memory[registers[3]] = 1;
            }
            else {
                this.memory[registers[3]] = 0;
            }
        }
    };
    // executes the program
    IntCodeComputer.prototype.run = function () {
        if (!this.input) {
            console.error("You have not loaded any instructions or initialized the input...");
        }
        var maxLength = this.memory.length;
        var increment; // for moving the programCounter
        // begin
        while (this.programCounter < maxLength) {
            // Extract IntCode and make Instruction Object
            var code = this.memory[this.programCounter];
            console.log("PC: " + this.programCounter + ";    memory[225] = " + this.memory[225]);
            var instruction = new opCodeInstruction_1.OpCodeInstruction(code, this.programCounter);
            console.log('--- instruction ---');
            console.table(instruction);
            increment = instruction.getJump();
            // Handles the instruction: FINISH IMPLEMENTATION ABOVE
            var override = this.applyOpCode(this.programCounter, instruction);
            // prepare for next instruction
            if (override === 0) {
                this.programCounter += increment;
            }
            else if (override > 0) {
                this.programCounter = override;
            }
            else {
                // override === -1
                console.log();
                break;
            }
            //console.log(`======================================`);
            console.log("========== NEXT INSTRUCTION ==========\n");
            //console.log(`======================================`);
        }
    };
    return IntCodeComputer;
}());
exports.IntCodeComputer = IntCodeComputer;
function testIntCodeComputer(init) {
    var Computer = new IntCodeComputer();
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
