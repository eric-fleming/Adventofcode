"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var intCodeComputer_1 = require("./intCodeComputer");
var Amplifier = /** @class */ (function () {
    //private nextAmplifier: any; // could be Amp || null
    function Amplifier(ps, inputVal, file) {
        this.phaseSetting = ps;
        this.inputSignal = inputVal;
        this.opcodeFileName = file;
    }
    Amplifier.prototype.initialize = function () {
        this.intCodeComputer = new intCodeComputer_1.AmpCodeComputer();
        this.intCodeComputer.loadInstructions(this.phaseSetting, this.inputSignal, this.opcodeFileName);
        //this.intCodeComputer.run();
        //this.oldMemory = this.intCodeComputer.saveMemory();
    };
    Amplifier.prototype.getOutputSignal = function () {
        return this.outputSignal;
    };
    Amplifier.prototype.run = function () {
        console.log("started Amp");
        this.initialize();
        this.intCodeComputer.run();
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
