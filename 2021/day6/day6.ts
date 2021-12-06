/*Dependent Modules*/
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared/common';
const log = console.log;
const rawInput = inputToNumberArray('day6.input.txt', ',');
//console.table(rawInput);

function processDay(fishArray){
    let newfish = []
    for(let f=0; f<fishArray.length;f++){
        if(fishArray[f] == 0){
            fishArray[f] = 6;
            newfish.push(8);
        } else{
            fishArray[f] -= 1;
        }
    }
    fishArray = [...fishArray,...newfish];
    return fishArray;
}

function part1() {
    let days = 80;
    let fishes = rawInput;
    while(days>0){
        fishes = processDay(fishes);
        days--;
    }

    //console.table(fishes);
    log(`There are ${fishes.length} in the population`);
    
}

function lifetimeImpact(days,fishes){
    while (days > 0) {
        fishes = processDay(fishes);
        days--;
    }

    return fishes.length
}

function fish(countdownVal:number, day:number){
    return {
        day:day,
        val: countdownVal
    }
}

function addFishDepthFirst(seedFish) {
    let population = 0;
    let seedfish = seedFish;
    let fishStack = [];
    while(seedfish != undefined){
        //log(`new seed fish: [day, val] = ${seedfish.day} ${seedfish.val}`);
        // add new fish to stack
        while(seedfish.day > 0){
            if(seedfish.val > 0){
                seedfish.val -= 1;
            }
            else if(seedfish.val == 0){
                fishStack.push(fish(8,seedfish.day));
                seedfish.val = 6;
            }
            seedfish.day -= 1;
            if(seedfish.val > seedfish.day){
                //can't create any more
                seedfish.day=0;
            }
        }

        // remove seed fish
        if(seedfish.day == 0){
            population += 1;
            seedfish = undefined;
        }

        // move to next seed fish
        seedfish = fishStack.pop();
        
    }

    return population;
}

function part2(){
    let totalPopulation = 0;
    let date = 18;
    const cache = new Map();
    let startingFish = [3, 4, 3, 1, 2];
    log(`Starting fish...`)
    log(`day: ${date}\t val: ${startingFish[0]}`);

    while(startingFish.length > 0){
        let seedFishValue = startingFish.pop();

        if (cache.has(seedFishValue)){
            totalPopulation += cache.get(seedFishValue);
        }
        else{
            let subPopulation = addFishDepthFirst(fish(seedFishValue, date));
            totalPopulation += subPopulation;
            cache.set(seedFishValue, subPopulation);
        }
        
    }

    log(`total population: ${totalPopulation} of fish`);
    console.table(cache);



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

//main(false, false);

function cacheBuilder(val:number,days:number) {
    if(days == 0){
        return 1;
    }
    let fishes = [val];
    //log('started while')
    while (days > 0) {
        fishes = processDay(fishes);
        days--;
    }
    //log('finished while')

    return fishes.length;

}

function fishArray(day: number, val: number,){
    return [day,val];

}
function dynamicTable(dayLimit: number): Map<string, number>{
    let table:Map<string,number> = new Map();
    let counter = 0
    
    for(let day=dayLimit; day>0; day--){
        //log('started '+day+' day');
        for(let val=8;val>=0;val--){
            let sub_population = cacheBuilder(val,day);
            table.set(fishArray(day,val).toString(),sub_population);
            counter++;
            //log(`counter at ${counter}`);
        }
        //log(`finished day ${day}`);
    }

    return table;

}

function decomposeStart(){
    let fishes = rawInput;
    let starts = new Map();
    for (let k = 0; k < fishes.length; k++){
        let fish = fishes[k];
        if(starts.has(fish)){
            let mapVal = starts.get(fish);
            starts.set(fish,mapVal+1)
        } else{
            starts.set(fish,1);
        }
    }

    return starts
}

function part1withCache(days,cache,input){

    let fishes = input;//rawInput [3, 4, 3, 1, 2]
    let population = 0;
    
    while (days > 0) {

        //scan for fish in cache
        //move fish to new array
        let remainingFish = [];
        for(let k=0; k<fishes.length;k++){
            if(cache.has(fishArray(days,fishes[k]).toString())){
                //log('in cache')
                population += cache.get(fishArray(days, fishes[k]).toString());
            } else{
                remainingFish.push(fishes[k]);
            }
        }
        fishes = remainingFish;
        if(fishes.length == 0){
            break;
        }

        //process remainng fish
        fishes = processDay(fishes);
        days--;
    }

    //console.table(fishes);
    //log(`There are ${population} in the population`);
    return population
}

let duplicateStarts = decomposeStart();
console.table(duplicateStarts)
log(rawInput.length)

/** 
log('---------------------')
log('part 1 with cache\n')

log('fish after 80 days = ' + part1withCache(256,128));
log('---------------------')
*/

/*
let arr = [8,1];
log(arr.toString());

console.table(cache);
console.log(cache.has([8, 1].toString()));
*/


function realPart2(){

    let duplicateStarts = decomposeStart();
    let sub_branch_populations:number[] = [];

    log('caching started...');
    let cache = dynamicTable(128);
    log('caching complete');
    

    for(let key=1;key<=5;key++){
        log(`sub brach ${key} started...`);
        sub_branch_populations[key] = part1withCache(256,cache,[key]);
        log(`sub brach ${key} completed`);
    }

    let population = 0;
    for (let key = 1; key <= 5; key++){
        let product = sub_branch_populations[key] * duplicateStarts.get(key);
        population += product;
    }

    log(`Total population = ${population}`);

}

log('---------------------')
log('part 2 with cache\n')

log('fish after 256 days = ');
realPart2()
