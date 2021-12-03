// common methods to be used for multiple days
var fs = require('fs');


// reads the text file as one giant string
export function readInput(fileName: string) {
    const inputRead = fs.readFileSync(fileName, 'utf8');
    return inputRead;
}


// takes a formatted string
// with the corresponding array of object keys
// and the list of character delimeters for each key
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

// takes an array of formatted strings
// with the corresponding array of object keys
// and the list of character delimeters for each key
export function stringArrayToObjectArray(stringArray: string[], keys: string[], chars: string[]){
    let dataObjects: any[] = [];
    for (let d = 0; d < stringArray.length; d++) {
        let str = stringArray[d];
        let obj = stringInputToObject(str, keys, chars);
        dataObjects.push(obj);
    }
    return dataObjects;
}


// meant to split a text file with only one type of delimeter
// ideal for successive input of state changes
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


// composed version of readFile and inputToArray
// convert contents to numbers
export function inputToNumberArray(fileName: string, splitChar:string){ 
    const rawFile = readInput(fileName);
    return inputToArray(rawFile,'number',splitChar);
}

// composed version of readFile and inputToArray
// leave contents as strings
export function inputToStringArray(fileName: string, splitChar: string) {
    const rawFile = readInput(fileName);
    return inputToArray(rawFile, 'string', splitChar);
}

export function inputToMultiStringArray(fileName: string, rowSplitChar: string){
    const splitIntoRows = inputToStringArray(fileName, rowSplitChar);
    let multiArray: string [][] = [];
    for(let i = 0; i < splitIntoRows.length - 1; i++){
        let rowString = splitIntoRows[i];
        let currentRow: string[] = [];
        for (let j = 0; j < splitIntoRows[0].length; j++){
            if (rowString === undefined || rowString === '' || rowString === '\n' || rowString === '\r\n'){
                continue;
            }
            else{
                let char = rowString.substring(j,j+1);
                currentRow.push(char);
            }
        }
        multiArray.push(currentRow);
    }

    return multiArray;
}




export function getAllIndexes(arr: any[], val: any) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}