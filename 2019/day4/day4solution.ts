/*Dependent Modules*/
import
{ 
    readInput, inputToArray, inputToNumberArray,
    inputToStringArray, stringInputToObject, stringArrayToObjectArray 
} from '../shared_functions/common';

// const rawInput = readInput('day4input.txt');


function hasDoubleDigit(input:number): boolean {
    let str = String(input);
    let len = str.length;
    
    for (let n = 0; n < 10; n++){
        let doubledigit = String(n)+String(n);
        if (str.indexOf(doubledigit) >= 0){
            return true;
        }
    }
    return false;
}
function noHasTripleDigit(input: number): boolean {
    let str = String(input);
    let len = str.length;

    for (let n = 0; n < 10; n++) {
        let doubledigit = String(n) + String(n);
        let tripledigit = String(n) + String(n) +String(n);
        if (str.indexOf(doubledigit) >= 0 && !(str.indexOf(tripledigit) >= 0)) {
            return true;
        }
    }
    return false;
}
console.log('test double is false : ' + hasDoubleDigit(127345));
console.log('test double is true : ' + hasDoubleDigit(1234445));


function isNonDecreasing(input:number):boolean {
    let str = String(input);
    let len = str.length;
    let nonDecreasing = true;
    for (let n = 0; n < len - 1; n++) {
        nonDecreasing = nonDecreasing && (str[n] <= str[n+1]);
    }
    return nonDecreasing;
}

console.log('test double is false : ' + isNonDecreasing(1127345));
console.log('test double is false : ' + isNonDecreasing(1233440));
console.log('test double is true : ' + isNonDecreasing(1233445));
console.log('test double is true : ' + isNonDecreasing(257889));

function firstChallenge() {
    const min = 234208;
    const max = 765869;
    let count = 0;
    for(let num = min; num <= max;num++){
        if(hasDoubleDigit(num) && isNonDecreasing(num)){
            count++;
        }
    }
    console.log('---------------------')
    console.log('the count is : '+count);
 }
function secondChallenge() {
    const min = 234208;
    const max = 765869;
    let count = 0;
    for (let num = min; num <= max; num++) {
        if (hasDoubleDigit(num) && isNonDecreasing(num)&& noHasTripleDigit(num)) {
            count++;
        }
    }
    console.log('---------------------')
    console.log('the count is : ' + count);
 }















// main method to run the program
function main(first: boolean, second: boolean) {
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