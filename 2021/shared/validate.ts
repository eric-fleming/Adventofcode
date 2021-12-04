
// ranges are inclusive
const ASCII_CHAR_RANGES = {
    lower: [97,122],
    upper: [65,90],
    numeric: [48,57],
}

function isInCharacterRange(char,range){
    let code = char.charCodeAt()
    if(code >= range[0] && code <= range[1]){
        return true
    }
    return false
}

export function isLowerCase(char){
    return isInCharacterRange(char, ASCII_CHAR_RANGES.lower);
}

export function isUpperCase(char) {
    return isInCharacterRange(char, ASCII_CHAR_RANGES.upper);
}

export function isNumeric(char) {
    return isInCharacterRange(char, ASCII_CHAR_RANGES.numeric);
}

export function isAlphaNumeric(char){
    return isLowerCase(char) || isUpperCase(char) || isNumeric(char);
}

export function isBinary(char){
    return isInCharacterRange(char,[48,49])
}

export function isHexidecimal(char){
    return isNumeric(char) || isInCharacterRange(char,[65,70]) || isInCharacterRange(char,[97,102]);
}



// Testing the code

const log = console.log;

function test(char){
    let header = ["char","is lower","is upper","is numeric", "is hexadecimal"];
    let result = [char, isLowerCase(char), isUpperCase(char), isNumeric(char), isHexidecimal(char)]
    console.table([
        header,
        result
    ])
}

function main(){
    let charList = ["A","F", "H", "Z","a","f", "r", "z", "0","7","9"];
    for(let index=0; index < charList.length;index++){
        test(charList[index]);
    }
}


main();