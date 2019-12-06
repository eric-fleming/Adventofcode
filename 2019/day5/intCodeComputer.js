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
    // not safe yet
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
    //not safe yet
    // supposed to call the method above to dynamically load the data
    // I had many errors so I postponed working on it and just repeated myself
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
        //console.log('--- registers ---');
        //console.table(registers);
        // decide and execute
        var action = registers[0];
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
            else {
                // param mode 1 : pass by value
                this.input = this.memory[pc + 1];
            }
            return 0;
        }
        else if (action === 4) {
            if (instruction.p1 === 0) {
                // param mode 0 : pass by ref
                console.log("output (by ref) : " + this.memory[this.memory[pc + 1]]);
            }
            else {
                // param mode 1 : pass by value
                console.log("output (by val) : " + this.memory[pc + 1]);
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
            }
            else {
                this.memory[registers[3]] = 0;
            }
            return 0;
        }
        else if (action === 8) {
            if (registers[1] === registers[2]) {
                this.memory[registers[3]] = 1;
            }
            else {
                this.memory[registers[3]] = 0;
            }
            return 0;
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
            var instruction = new opCodeInstruction_1.OpCodeInstruction(code, this.programCounter);
            increment = instruction.getJump();
            // Handles the instruction: FINISH IMPLEMENTATION ABOVE
            var override = this.applyOpCode(this.programCounter, instruction);
            // prepare for next instruction
            if (override === 0) {
                this.programCounter += increment;
            }
            else if (override > 0) {
                //console.log('We jumped!');
                this.programCounter = override;
            }
            else {
                // override === -1
                break;
            }
            //console.log(`\n========= NEXT ITERATION =========\n`);
        }
    };
    return IntCodeComputer;
}());
exports.IntCodeComputer = IntCodeComputer;
// main method to run the program
function main(init1, init2) {
    var ComputerA = new IntCodeComputer();
    var ComputerB = new IntCodeComputer();
    if (init1 !== 0) {
        console.log('------  First Challenge Started -----');
        ComputerA.loadInstructions(init1);
        ComputerA.run();
        console.log('------  Challend Completed -----------\n\n');
    }
    if (init2 !== 0) {
        console.log('\n\n------  Second Challenge Started -----');
        ComputerB.loadInstructions(init2);
        ComputerB.run();
        console.log('------  Challend Completed -----------');
    }
}
main(1, 5);
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
