"use strict";
exports.__esModule = true;
var relativeIntCodeComputer_1 = require("./relativeIntCodeComputer");
var testInputs = {
    't1': '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
    't2': '1102,34915192,34915192,7,4,7,99,0',
    't3': '104,1125899906842624,99'
};
function test(init1) {
    var Computer = new relativeIntCodeComputer_1.RelativeIntCodeComputer();
    if (init1 !== 0) {
        console.log('------  Test Started -----');
        Computer.loadInstructions(init1, '../day5/day5input.txt');
        var output = Computer.run();
        console.log('\n\n------  Test Completed -----------\n');
        console.log("output is = " + output);
    }
}
//tests/t1.txt
//tests/t2.txt
//tests/t3.txt
//../day5/day5input.txt
test(1);
