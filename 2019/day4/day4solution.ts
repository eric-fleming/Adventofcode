/* Input Range */
const min = 234208;
const max = 765869;

// The number you are looking for has a double digit
// but this could be in a larger triple or quadruple, etc...
function hasDoubleDigit(input:number): boolean {
    let str = String(input);
    
    for (let n = 0; n < 10; n++){
        let doubledigit = String(n)+String(n);
        if (str.indexOf(doubledigit) >= 0){
            return true;
        }
    }
    return false;
}

// can have two repeating digits, but not three repeating digits or more.
// only need to test for excluding triples because of set theory
function hasStrictlyDoubleDigit(input: number): boolean {
    let str = String(input);

    for (let n = 0; n < 10; n++) {
        let doubledigit = String(n) + String(n);
        let tripledigit = String(n) + String(n) + String(n);
        if (str.indexOf(doubledigit) >= 0 && !(str.indexOf(tripledigit) >= 0)) {
            return true;
        }
    }
    return false;
}


// Tests whether the integer is in non-decraseing order
// The following digit can be the same value, larger, but not smaller.
function isNonDecreasing(input:number):boolean {
    let str = String(input);
    let len = str.length;
    let nonDecreasing = true;
    for (let n = 0; n < len - 1; n++) {
        nonDecreasing = nonDecreasing && (str[n] <= str[n+1]);
    }
    return nonDecreasing;
}


function firstChallenge() {
    let count = 0;
    for(let num = min; num <= max; num++){
        if(hasDoubleDigit(num) && isNonDecreasing(num)){
            count++;
        }
    }
    console.log('the count is : '+count);
    return count;
 }


function secondChallenge() {
    let count = 0;
    for (let num = min; num <= max; num++) {
        if (hasStrictlyDoubleDigit(num) && isNonDecreasing(num)) {
            count++;
        }
    }
    console.log('the count is : ' + count);
    return count;
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