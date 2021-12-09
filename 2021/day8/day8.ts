/*Dependent Modules*/
import { inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day8.input.txt', '\n');
//console.table(rawInput);

function isUniqueLength(size){
    return size == 2 || size == 3 || size == 4 || size == 7;
}

function part1() {

    const freshInput:string[] = [...rawInput];

    let inputPairs:string[][] = [];
    let inputs:string[] = []
    let outputs: string[] = [];
    for(let k=0; k<freshInput.length;k++){
        let pair = freshInput[k].split(" | ");
        inputPairs[k] = pair;
        inputs[k] = pair[0].trim();
        outputs[k] = pair[1].trim();
    }

    let count = 0;
    for (let k = 0; k < outputs.length; k++){
        let list = outputs[k].split(" ");
        list.forEach(item =>{
            if(isUniqueLength(item.length)){
                count++;
            }
        })
    }

    log(`${count}`);
}

function orderSegments(segments) {
    let list: string[] = segments.split('');
    list.sort();
    return list.join('');
}

function isZero(word,letterMap,countMap){
    let len = word.length == 6
    let primes = word.includes(countMap.get(4)) && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
    let count = 0;
    for (let k = 0; k < word.length; k++) {
        let target = letterMap.get(word[k])
        if (target == 8) {
            count++
        }
    }
    return len && primes && count == 2;
}

function isOne(word){
    return word.length == 2;
}

function isTwo(word:string,countMap){
    // has length 5 ; unique segment appears 4 times
    return word.length == 5 && word.includes(countMap.get(4));
}

function isThree(word,countMap){
    // has length 5 ; unique segment appears 9 times
    return word.length == 5 && word.includes(countMap.get(9)) && !word.includes(countMap.get(6));
}

function isFour(word) {
    return word.length == 4;
}

function isFive(word,countMap){
    // has length 5 ; unique segments that appear 6 and 9 times
    return word.length == 5 && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
}

function isSix(word,letterMap,countMap){
    
    let len = word.length == 6
    let primes = word.includes(countMap.get(4)) && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
    let count = 0;
    for(let k=0; k<word.length;k++){
        let target = letterMap.get(word[k])
        if(target == 7){
            count++
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

function isNine(word,countMap){
    // has length 6 ; unique segments that appear 6 and 9 times
    return word.length == 6 && word.includes(countMap.get(6)) && word.includes(countMap.get(9));
}

function generatefrequencyMap(sentence:string){
    let freqMapByLetter = new Map();
    sentence = sentence.replace(/\s/g,'');

    for(let c=0;c<sentence.length;c++){
        let char = sentence[c]
        if (freqMapByLetter.has(char)){
            freqMapByLetter.set(char, freqMapByLetter.get(char)+1);
        } else {
            freqMapByLetter.set(char,1);
        }
    }
    return freqMapByLetter;
}

function generatefrequencyMapByCount(sentence: string) {
    let freqMapByCount = new Map();
    sentence = sentence.replace(/\s/g, '');
    let letters:string[] = ['a','b','c','d','e','f','g'];

    letters.forEach(letter =>{
        let count=0;
        for (let c = 0; c < sentence.length; c++) {
            if (sentence[c] == letter) {
                count++
            } 
        }

        if(freqMapByCount.has(count)){
            let entry = freqMapByCount.get(count);
            entry.push(letter);
        } else{
            freqMapByCount.set(count,[letter]);
        }

    });

    
    return freqMapByCount;
}



function decodeInput(sentence:string, digitMap,letterMap,countMap){
    let digits = (sentence.trim()).split(" ");

    for (let k = 0; k < digits.length; k++) {
        let digit = orderSegments(digits[k]);
        //order matters here
        if (isOne(digit)) {
            digitMap.set(digit, '1')
        } else if (isSeven(digit)) {
            digitMap.set(digit, '7')
        } else if (isFour(digit)) {
            digitMap.set(digit, '4')
        } else if (isEigth(digit)) {
            digitMap.set(digit, '8')
        } else if(isTwo(digit,countMap)){
            digitMap.set(digit,'2')
        } else if(isThree(digit,countMap)){
            digitMap.set(digit, '3')
        } else if(isFive(digit,countMap)){
            digitMap.set(digit, '5')
        } else if (isSix(digit,letterMap, countMap)) {
            digitMap.set(digit, '6')
        } else if (isZero(digit, letterMap, countMap)) {
            digitMap.set(digit, '0')
        } else if (isNine(digit, countMap)) {
            digitMap.set(digit, '9')
        }
    }
    //console.table(digitMap);
    return digitMap;
}

function part2() {

    const freshInput: string[] = [...rawInput];

    let inputPairs: string[][] = [];
    let inputs: string[] = []
    let outputs: string[] = [];
    for (let k = 0; k < freshInput.length; k++) {
        let pair = freshInput[k].split(" | ");
        inputPairs[k] = pair;
        inputs[k] = pair[0].trim();
        outputs[k] = pair[1].trim();
    }
    
    let total = 0;
    for (let k = 0; k < inputPairs.length;k++){
        // create maps
        let letterMap = generatefrequencyMap(inputs[k]);
        let countMap = generatefrequencyMapByCount(inputs[k]);
        let digitDecoder = new Map();
        digitDecoder = decodeInput(inputs[k], digitDecoder, letterMap, countMap);

        // process output
        let out = outputs[k].split(" ")
        out = out.map(digit => orderSegments(digit));
        out = out.map(digit => digitDecoder.get(digit));
        let val = Number(out.join(''));
        log(val)
        total += val

    }

    log(`total = ${total}`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
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

main(false, true);