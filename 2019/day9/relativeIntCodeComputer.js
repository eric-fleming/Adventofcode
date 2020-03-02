"use strict";
exports.__esModule = true;
/* Dependent Modules */
var common_1 = require("../shared_functions/common");
var opCodeInstruction_1 = require("../day5/opCodeInstruction");
var RelativeIntCodeComputer = /** @class */ (function () {
    function RelativeIntCodeComputer() {
        this.programCounter = 0;
        this.relativeBase = 0;
        this.memory = [];
    }
    // clears the computer to be used again;
    RelativeIntCodeComputer.prototype.reset = function () {
        this.programCounter = 0;
        this.relativeBase = 0;
        this.memory = [];
        this.input = undefined;
        this.output = [];
    };
    // initializes the object
    RelativeIntCodeComputer.prototype.loadInstructions = function (inputVal, file) {
        this.reset();
        var rawInput = common_1.readInput(file);
        this.memory = common_1.inputToArray(rawInput, 'number', ',');
        //console.table(this.memory);
        var len = this.memory.length;
        var big = 10000000;
        console.log('filling with lots of zeros...');
        for (var i = len; i < big; i++) {
            this.memory[i] = 0;
        }
        this.input = inputVal;
    };
    // if the mode is 0, pass by reference
    // if the mode is 1, pass by value
    // if the mode is 2, reference the relativeBase
    RelativeIntCodeComputer.prototype.loadParamFromMem = function (opcode_idx, instruction, paramInt) {
        // not safe for p3 since it does not always pull info from the memory array.
        var paramMode = instruction['p' + paramInt];
        if (paramMode === 2) {
            var relativeShift = this.memory[opcode_idx + paramInt];
            return this.memory[this.relativeBase + relativeShift];
        }
        else if (paramMode === 1) {
            return this.memory[opcode_idx + paramInt];
        }
        else if (paramMode === 0) {
            return this.memory[this.memory[opcode_idx + paramInt]];
        }
    };
    // supposed to call the method above to dynamically load the data
    // I had many errors so I postponed working on it and just repeated myself
    RelativeIntCodeComputer.prototype.loadRegistersFromMem = function (pc, instruction) {
        //staging the locations
        var registers = [instruction.getAction()];
        // load the params
        for (var i = 1; i < 4; i++) {
            //console.log(`has param ${i}? => ${instruction['p' + i] !== undefined}`);
            var pindex = 'p' + i;
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
    };
    // executes the instruction one the memory
    RelativeIntCodeComputer.prototype.applyOpCode = function (pc, instruction) {
        // registers === [action, p1, p2, p3]
        // with the correct values for processing
        var registers = this.loadRegistersFromMem(pc, instruction);
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
            else if (instruction.p1 === 1) {
                // param mode 1 : pass by value
                // not possible
                this.memory[this.memory[pc + 1]] = this.input;
            }
            else if (instruction.p1 === 2) {
                // param mode 2: relative
                this.memory[this.relativeBase + this.memory[pc + 1]] = this.input;
            }
            return 0;
        }
        else if (action === 4) {
            if (instruction.p1 === 0) {
                // param mode 0 : pass by ref
                console.log("output (by ref) : " + this.memory[this.memory[pc + 1]]);
                this.output.push(this.memory[this.memory[pc + 1]]);
            }
            else if (instruction.p1 === 1) {
                // param mode 1 : pass by value
                console.log("output (by val) : " + this.memory[pc + 1]);
                this.output.push(this.memory[pc + 1]);
            }
            else if (instruction.p1 === 2) {
                // param mode 0 : pass by ref
                console.log("output (by rel ref) : " + this.memory[this.relativeBase + this.memory[pc + 1]]);
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
        else if (action === 9) {
            // add parameter to the relative base.
            if (instruction.p1 === 0) {
                this.relativeBase += this.memory[this.memory[pc + 1]];
            }
            if (instruction.p1 === 1) {
                this.relativeBase += this.memory[pc + 1];
            }
            if (instruction.p1 === 2) {
                this.relativeBase += this.memory[this.relativeBase + this.memory[pc + 1]];
            }
            return 0;
        }
    };
    // executes the program
    RelativeIntCodeComputer.prototype.run = function () {
        if (this.input === undefined) {
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
                console.log('--------------- terminates regularly');
                break;
            }
        }
        return this.output;
    }; //end of run()
    return RelativeIntCodeComputer;
}()); // end of class
exports.RelativeIntCodeComputer = RelativeIntCodeComputer;
// main method to run the program
function main(init1, init2) {
    var Computer = new RelativeIntCodeComputer();
    if (init1 !== 0) {
        console.log('------  First Challenge Started -----');
        Computer.loadInstructions(init1, 'day9input.txt');
        var output = Computer.run();
        console.log("output is = " + output);
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
