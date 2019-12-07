"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
var intCodeComputer_1 = require("../day5/intCodeComputer");
var rawInput = common_1.readInput('day7input.txt');
var Amplifier = /** @class */ (function () {
    //private nextAmplifier: any; // could be Amp || null
    function Amplifier(ps, inputVal, file) {
        this.phaseSetting = ps;
        this.inputSignal = inputVal;
        this.opcodeFileName = file;
    }
    Amplifier.prototype.initialize = function () {
        this.intCodeComputer = new intCodeComputer_1.IntCodeComputer();
        this.intCodeComputer.loadInstructions(this.inputSignal, this.opcodeFileName);
    };
    Amplifier.prototype.getOutputSignal = function () {
        return this.outputSignal;
    };
    Amplifier.prototype.run = function () {
        console.log("started Amp");
        this.initialize();
        this.outputSignal = this.intCodeComputer.run();
        if (this.outputSignal !== undefined) {
            console.log("obtained output");
        }
        else {
            console.log("no output calculated");
        }
    };
    return Amplifier;
}());
exports.Amplifier = Amplifier;
