/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToStringArray('day3input.txt', '\n');
console.table(rawInput);


function calcGammaRate(binary): string {

    let digits = binary[0].length;
    let len = binary.length;
    let gamma = '';

    for (let digit = 0; digit < digits; digit++){

        let ones = 0;
        let zeros = 0;

        for (let index = 0; index < len; index++) {
            
            if(binary[index][digit] === "1"){
                ones++;
            }
            else if(binary[index][digit] == "0"){
                zeros++
            }
        }

        if (ones > zeros) {
            gamma += "1";
        } else if (zeros > ones) {
            gamma += "0"
        } else if (ones == zeros){
            gamma += "D"
        }

    }

    return gamma;

}

function calcEpsilonRate(binary): string{
    let gammaRate = calcGammaRate(binary);
    let epsilon = '';

    for(let d=0;d<gammaRate.length;d++){
        if(gammaRate[d]=='1'){
            epsilon+='0';
        } else if (gammaRate[d] == '0'){
            epsilon+='1';
        } else{
            epsilon+="D"
        }
    }

    return epsilon;
}

function part1() {

    let gammaRate = calcGammaRate(rawInput);
    let epsilonRate = calcEpsilonRate(rawInput);

    log(`gamma rate: ${gammaRate}`);
    log(`epsilon rate: ${epsilonRate}`);

    let product = parseInt(gammaRate,2) * parseInt(epsilonRate,2)
    // answer
    log(`power consumption = ${product}`);
}

function mostCommonBit(binary,digit){
    let gamma = calcGammaRate(binary);
    //log(gamma)
    let bit = gamma[digit]
    if(bit == "D"){
        return "1"
    }
    return gamma[digit];
}

function selectWinners(binary,digit,mode){

    let winners = [];
    for(let k=0; k<binary.length;k++){
        if(binary[k][digit] == mode){
            winners.push(binary[k]);
        }
    }

    return winners;
}

function calcOxygenRating(binary){
    let len = binary.length;
    let digits = binary[0].length;

    let winners = [...binary];

    for (let digit = 0; digit < digits; digit++){
        let mostCommon = mostCommonBit(winners,digit);
        //log(`most common bit\t digit=${digit}\t bit=${mostCommon}`);
        winners = selectWinners(winners,digit,mostCommon);
        //log(winners)
        if(winners.length == 1){
            return winners[0];
        }
    }

    return 'nope';

}

function leastCommonBit(binary,digit){
    let epsilon = calcEpsilonRate(binary);
    //console.log(epsilon)
    let bit = epsilon[digit]
    if (bit == "D") {
        return "0"
    }
    return epsilon[digit];
}

function calcCarbonRating(binary){
    let len = binary.length;
    let digits = binary[0].length;

    let winners = [...binary];

    for (let digit = 0; digit < digits; digit++) {
        let leastCommon = leastCommonBit(winners, digit);
        //log(`least common bit\t digit=${digit}\t bit=${leastCommon}`);
        winners = selectWinners(winners, digit, leastCommon);
        //log(winners)
        if (winners.length == 1) {
            return winners[0];
        }
    }

    return 'nope';
}

function part2() {

    let oxygenRating = calcOxygenRating(rawInput);
    let carbonRating = calcCarbonRating(rawInput);


    log(`${oxygenRating} == ${parseInt(oxygenRating,2)}`);
    log(`${carbonRating} == ${parseInt(carbonRating, 2)}`);
    let life = parseInt(oxygenRating, 2) * parseInt(carbonRating, 2);
    // answer
    log(`Life support Rating = ${life}`);
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

main(true, true);