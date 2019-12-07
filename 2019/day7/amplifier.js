"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var ampCodeComputer_1 = require("./ampCodeComputer");
var Amplifier = /** @class */ (function () {
    //private nextAmplifier: any; // could be Amp || null
    function Amplifier(ps, inputVal, file) {
        this.phaseSetting = ps;
        this.inputSignal = inputVal;
        this.opcodeFileName = file;
    }
    Amplifier.prototype.initialize = function () {
        this.intCodeComputer = new ampCodeComputer_1.AmpCodeComputer();
        this.intCodeComputer.loadInstructions(this.phaseSetting, this.inputSignal, this.opcodeFileName);
    };
    Amplifier.prototype.getOutputSignal = function () {
        return this.outputSignal;
    };
    Amplifier.prototype.run = function () {
        //console.log(`started Amp`);
        this.initialize();
        this.intCodeComputer.run();
        this.outputSignal = this.intCodeComputer.run();
        if (this.outputSignal === undefined) {
            console.log("no output calculated");
        }
    };
    return Amplifier;
}());
exports.Amplifier = Amplifier;
