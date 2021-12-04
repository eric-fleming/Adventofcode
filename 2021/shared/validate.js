"use strict";
exports.__esModule = true;
exports.isHexidecimal = exports.isBinary = exports.isAlphaNumeric = exports.isNumeric = exports.isUpperCase = exports.isLowerCase = void 0;
// ranges are inclusive
var ASCII_CHAR_RANGES = {
    lower: [97, 122],
    upper: [65, 90],
    numeric: [48, 57]
};
function isInCharacterRange(char, range) {
    var code = char.charCodeAt();
    if (code >= range[0] && code <= range[1]) {
        return true;
    }
    return false;
}
function isLowerCase(char) {
    return isInCharacterRange(char, ASCII_CHAR_RANGES.lower);
}
exports.isLowerCase = isLowerCase;
function isUpperCase(char) {
    return isInCharacterRange(char, ASCII_CHAR_RANGES.upper);
}
exports.isUpperCase = isUpperCase;
function isNumeric(char) {
    return isInCharacterRange(char, ASCII_CHAR_RANGES.numeric);
}
exports.isNumeric = isNumeric;
function isAlphaNumeric(char) {
    return isLowerCase(char) || isUpperCase(char) || isNumeric(char);
}
exports.isAlphaNumeric = isAlphaNumeric;
function isBinary(char) {
    return isInCharacterRange(char, [48, 49]);
}
exports.isBinary = isBinary;
function isHexidecimal(char) {
    return isNumeric(char) || isInCharacterRange(char, [65, 70]) || isInCharacterRange(char, [97, 102]);
}
exports.isHexidecimal = isHexidecimal;
// Testing the code
var log = console.log;
function test(char) {
    var header = ["char", "is lower", "is upper", "is numeric", "is hexadecimal"];
    var result = [char, isLowerCase(char), isUpperCase(char), isNumeric(char), isHexidecimal(char)];
    console.table([
        header,
        result
    ]);
}
function main() {
    var charList = ["A", "F", "H", "Z", "a", "f", "r", "z", "0", "7", "9"];
    for (var index = 0; index < charList.length; index++) {
        test(charList[index]);
    }
}
main();
