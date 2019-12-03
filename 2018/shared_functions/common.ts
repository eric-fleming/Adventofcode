// common methods to be used for multiple days
var fs = require('fs');

export function readInputSync(fileName: string) {
    const inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}

export function readInput(fileName: string){
    const inputRead = fs.readFile(fileName,'utf8', (err:any, data:any) => {
        if (err) throw err;
        console.log(data);
    });
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

export function inputToNumberArray(fileName: string, splitChar:string){ 
    const rawFile = readInputSync(fileName);
    return inputToArray(rawFile,'number',splitChar);
}

export function inputToStringArray(fileName: string, splitChar: string) {
    const rawFile = readInputSync(fileName);
    return inputToArray(rawFile, 'string', splitChar);
}