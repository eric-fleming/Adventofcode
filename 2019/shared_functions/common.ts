// common methods to be used for multiple days
var fs = require('fs');

export function readInput(fileName: string) {
    const inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}

export function inputToArray(input:string, type:string,char:string) {
    type = type.toLocaleLowerCase();
    const inputArray = input.split(char);
    let outputArray: any[];
    if( type === 'number'){
        outputArray = inputArray.map((str) => Number(str));
    }
    else if (type === 'string'){
        outputArray = inputArray.map((str) => String(str));
    }
    return outputArray;
}