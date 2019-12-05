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
        if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        }
        else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    };
    IntCodeComputer.prototype.loadRegistersFromMem = function (pc, instruction) {
        //staging the locations
        var registers = [instruction.getAction(), 0, 0, 0];
        // load the params
        for (var i = 1; i < 4; i++) {
            if (!!instruction['p' + i]) {
                registers[i] = this.loadParamFromMem(pc, instruction, i);
            }
        }
        return registers;
    };
    // executes the instruction one the memory
    IntCodeComputer.prototype.applyOpCode = function (pc, instruction) {
        // registers === [action, p1, p2, p3]
        // with the correct values for processing
        var registers = this.loadRegistersFromMem(pc, instruction);
        // decide and execute
        if (registers[0] === 99) {
            console.log('--- HALT: opcode 99 ---');
            return -1;
        }
        else if (registers[0] === 1) {
            this.memory[registers[3]] = this.memory[registers[1]] + this.memory[registers[2]];
            return 0;
        }
        else if (registers[0] === 2) {
            this.memory[registers[3]] = this.memory[registers[1]] * this.memory[registers[2]];
            return 0;
        }
        else if (registers[0] === 3) {
            // supposed to prompt but I just cached it
            this.memory[registers[1]] = this.input;
            return 0;
        }
        else if (registers[0] === 4) {
            // treat the input as a reference
            console.log("output : " + this.memory[registers[1]]);
            return 0;
        }
        else if (registers[0] === 5) {
            return 1234;
        }
        else if (registers[0] === 6) {
            return 1234;
        }
        else if (registers[0] === 7) {
            return 0;
        }
        else if (registers[0] === 8) {
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
        }
    };
    return IntCodeComputer;
}());
exports.IntCodeComputer = IntCodeComputer;
function testIntCodeComputer() {
    var Computer = new IntCodeComputer();
    Computer.loadInstructions(1);
    Computer.run();
}
testIntCodeComputer();
