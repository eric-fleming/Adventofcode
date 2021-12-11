"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared/common");
var log = console.log;
var rawInput = (0, common_1.inputToStringArray)('day8.input.txt', '\n');
//console.table(rawInput);
function isUniqueLength(size) {
    return size == 2 || size == 3 || size == 4 || size == 7;
}
function part1() {
    var freshInput = __spreadArray([], rawInput, true);
    var inputPairs = [];
    var outputs = [];
    for (var k = 0; k < freshInput.length; k++) {
        var pair = freshInput[k].split(" | ");
        outputs[k] = pair[1].trim();
    }
    var count = 0;
    for (var k = 0; k < outputs.length; k++) {
        var list = outputs[k].split(" ");
        list.forEach(function (item) {
            if (isUniqueLength(item.length)) {
                count++;
            }
        });
    }
    log("".concat(count));
}
function orderSegments(segments) {
    var list = segments.split('');
    list.sort();
    return list.join('');
}
function isZero(word, letterMap, countMap) {
    var len = word.length == 6;
    var primes = word.includes(countMap.get(4)) && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
    var count = 0;
    for (var k = 0; k < word.length; k++) {
        var target = letterMap.get(word[k]);
        if (target == 8) {
            count++;
        }
    }
    return len && primes && count == 2;
}
function isOne(word) {
    return word.length == 2;
}
function isTwo(word, countMap) {
    // has length 5 ; unique segment appears 4 times
    return word.length == 5 && word.includes(countMap.get(4));
}
function isThree(word, countMap) {
    // has length 5 ; unique segment appears 9 times
    return word.length == 5 && word.includes(countMap.get(9)) && !word.includes(countMap.get(6));
}
function isFour(word) {
    return word.length == 4;
}
function isFive(word, countMap) {
    // has length 5 ; unique segments that appear 6 and 9 times
    return word.length == 5 && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
}
function isSix(word, letterMap, countMap) {
    var len = word.length == 6;
    var primes = word.includes(countMap.get(4)) && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
    var count = 0;
    for (var k = 0; k < word.length; k++) {
        var target = letterMap.get(word[k]);
        if (target == 7) {
            count++;
        }
    }
    return len && primes && count == 2;
}
function isSeven(word) {
    return word.length == 3;
}
function isEigth(word) {
    return word.length == 7;
}
function isNine(word, countMap) {
    // has length 6 ; unique segments that appear 6 and 9 times
    return word.length == 6 && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
}
function generatefrequencyMap(sentence) {
    var freqMapByLetter = new Map();
    sentence = sentence.replace(/\s/g, '');
    for (var c = 0; c < sentence.length; c++) {
        var char = sentence[c];
        if (freqMapByLetter.has(char)) {
            freqMapByLetter.set(char, freqMapByLetter.get(char) + 1);
        }
        else {
            freqMapByLetter.set(char, 1);
        }
    }
    return freqMapByLetter;
}
function generatefrequencyMapByCount(sentence) {
    var freqMapByCount = new Map();
    sentence = sentence.replace(/\s/g, '');
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    letters.forEach(function (letter) {
        var count = 0;
        for (var c = 0; c < sentence.length; c++) {
            if (sentence[c] == letter) {
                count++;
            }
        }
        if (freqMapByCount.has(count)) {
            var entry = freqMapByCount.get(count);
            entry.push(letter);
        }
        else {
            freqMapByCount.set(count, [letter]);
        }
    });
    return freqMapByCount;
}
function decodeInput(sentence, digitMap, letterMap, countMap) {
    var digits = (sentence.trim()).split(" ");
    for (var k = 0; k < digits.length; k++) {
        var digit = orderSegments(digits[k]);
        //order matters here
        if (isOne(digit)) {
            digitMap.set(digit, '1');
        }
        else if (isSeven(digit)) {
            digitMap.set(digit, '7');
        }
        else if (isFour(digit)) {
            digitMap.set(digit, '4');
        }
        else if (isEigth(digit)) {
            digitMap.set(digit, '8');
        }
        else if (isTwo(digit, countMap)) {
            digitMap.set(digit, '2');
        }
        else if (isThree(digit, countMap)) {
            digitMap.set(digit, '3');
        }
        else if (isFive(digit, countMap)) {
            digitMap.set(digit, '5');
        }
        else if (isSix(digit, letterMap, countMap)) {
            digitMap.set(digit, '6');
        }
        else if (isZero(digit, letterMap, countMap)) {
            digitMap.set(digit, '0');
        }
        else if (isNine(digit, countMap)) {
            digitMap.set(digit, '9');
        }
    }
    //console.table(digitMap);
    return digitMap;
}
function part2() {
    var freshInput = __spreadArray([], rawInput, true);
    var inputPairs = [];
    var inputs = [];
    var outputs = [];
    for (var k = 0; k < freshInput.length; k++) {
        var pair = freshInput[k].split(" | ");
        inputPairs[k] = pair;
        inputs[k] = pair[0].trim();
        outputs[k] = pair[1].trim();
    }
    var total = 0;
    var _loop_1 = function (k) {
        // create maps
        var letterMap = generatefrequencyMap(inputs[k]);
        var countMap = generatefrequencyMapByCount(inputs[k]);
        var digitDecoder = new Map();
        digitDecoder = decodeInput(inputs[k], digitDecoder, letterMap, countMap);
        // process output
        var out = outputs[k].split(" ");
        out = out.map(function (digit) { return orderSegments(digit); }).map(function (digit) { return digitDecoder.get(digit); });
        var val = Number(out.join(''));
        total += val;
    };
    for (var k = 0; k < inputPairs.length; k++) {
        _loop_1(k);
    }
    log("total = ".concat(total));
}
// main method to run the program
function main(first, second) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        part1();
        log('--------------------------------------');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        part2();
        log('--------------------------------------');
        log('\n\n');
    }
}
main(true, true);
