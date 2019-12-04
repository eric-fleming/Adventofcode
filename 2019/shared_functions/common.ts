// common methods to be used for multiple days
var fs = require('fs');

export function readInput(fileName: string) {
    const inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}


export function stringInputToObject(str: string, keys: string[], chars: string[]){
    if(keys.length != (chars.length + 1)){
        console.error('Miss match between key names and spliting characters');
    }
    let obj:any = {};
    let start = 0
    for(let n = 0; n < keys.length; n++){
        let key = keys[n];
        let stop;
        // for most keys
        if (n < (keys.length - 1)){
            stop = str.indexOf(chars[n]);
        }
        // for the last key
        else{
            stop = str.length;
        }
        // extract substring, set key value pair
        obj[key] = str.substring(start, stop).trim();
        // move the start
        start = stop + 1;

    }

    return obj;
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
    else{
        console.log(`${type} is a not a primitive or Object type.`);
        outputArray = [];
    }
    return outputArray;
}

export function inputToNumberArray(fileName: string,splitChar:string){ 
    const rawFile = readInput(fileName);
    return inputToArray(rawFile,'number',splitChar);
}

export function inputToStringArray(fileName: string, splitChar: string) {
    const rawFile = readInput(fileName);
    return inputToArray(rawFile, 'string', splitChar);
}