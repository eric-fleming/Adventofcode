/* Input Range */
var min = 234208;
var max = 765869;
// The number you are looking for has a double digit
// but this could be in a larger triple or quadruple, etc...
function hasDoubleDigit(input) {
    var str = String(input);
    for (var n = 0; n < 10; n++) {
        var doubledigit = String(n) + String(n);
        if (str.indexOf(doubledigit) >= 0) {
            return true;
        }
    }
    return false;
}
// can have two repeating digits, but not three repeating digits or more.
// only need to test for excluding triples because of set theory
function hasStrictlyDoubleDigit(input) {
    var str = String(input);
    for (var n = 0; n < 10; n++) {
        var doubledigit = String(n) + String(n);
        var tripledigit = String(n) + String(n) + String(n);
        if (str.indexOf(doubledigit) >= 0 && !(str.indexOf(tripledigit) >= 0)) {
            return true;
        }
    }
    return false;
}
// Tests whether the integer is in non-decraseing order
// The following digit can be the same value, larger, but not smaller.
function isNonDecreasing(input) {
    var str = String(input);
    var len = str.length;
    var nonDecreasing = true;
    for (var n = 0; n < len - 1; n++) {
        nonDecreasing = nonDecreasing && (str[n] <= str[n + 1]);
    }
    return nonDecreasing;
}
function firstChallenge() {
    var count = 0;
    for (var num = min; num <= max; num++) {
        if (hasDoubleDigit(num) && isNonDecreasing(num)) {
            count++;
        }
    }
    console.log('the count is : ' + count);
    return count;
}
function secondChallenge() {
    var count = 0;
    for (var num = min; num <= max; num++) {
        if (hasStrictlyDoubleDigit(num) && isNonDecreasing(num)) {
            count++;
        }
    }
    console.log('the count is : ' + count);
    return count;
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
