/*Dependent Modules*/
import { readInput, stringInputToObject, inputToArray, inputToNumberArray, inputToStringArray } from './common';

const rawInput = readInput('testinput.txt');
const data = inputToStringArray('testinput.txt','\n');

function test() { 
    let dataObjects: any[] = [];
    for(let d=0; d < data.length; d++){
        let str = data[d];
        let obj = stringInputToObject(str,['index','quantity','dimension'],['@',':']);
        dataObjects.push(obj);
    }
    console.table(dataObjects);
}


test();