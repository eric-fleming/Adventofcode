"use strict";
exports.__esModule = true;
// const rawInput = readInput('day4input.txt');
function hasDoubleDigit(input) {
    var str = String(input);
    var len = str.length;
    for (var n = 0; n < 10; n++) {
        var doubledigit = String(n) + String(n);
        if (str.indexOf(doubledigit) >= 0) {
            return true;
        }
    }
    return false;
}
function noHasTripleDigit(input) {
    var str = String(input);
    var len = str.length;
    for (var n = 0; n < 10; n++) {
        var doubledigit = String(n) + String(n);
        var tripledigit = String(n) + String(n) + String(n);
        if (str.indexOf(doubledigit) >= 0 && !(str.indexOf(tripledigit) >= 0)) {
            return true;
        }
    }
    return false;
}
console.log('test double is false : ' + hasDoubleDigit(127345));
console.log('test double is true : ' + hasDoubleDigit(1234445));
function isNonDecreasing(input) {
    var str = String(input);
    var len = str.length;
    var nonDecreasing = true;
    for (var n = 0; n < len - 1; n++) {
        nonDecreasing = nonDecreasing && (str[n] <= str[n + 1]);
    }
    return nonDecreasing;
}
console.log('test double is false : ' + isNonDecreasing(1127345));
console.log('test double is false : ' + isNonDecreasing(1233440));
console.log('test double is true : ' + isNonDecreasing(1233445));
console.log('test double is true : ' + isNonDecreasing(257889));
function firstChallenge() {
    var min = 234208;
    var max = 765869;
    var count = 0;
    for (var num = min; num <= max; num++) {
        if (hasDoubleDigit(num) && isNonDecreasing(num)) {
            count++;
        }
    }
    console.log('---------------------');
    console.log('the count is : ' + count);
}
function secondChallenge() {
    var min = 234208;
    var max = 765869;
    var count = 0;
    for (var num = min; num <= max; num++) {
        if (hasDoubleDigit(num) && isNonDecreasing(num) && noHasTripleDigit(num)) {
            count++;
        }
    }
    console.log('---------------------');
    console.log('the count is : ' + count);
}
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge();
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge();
        console.log('------  Challend Completed -----------');
    }
}
main(true, true);
