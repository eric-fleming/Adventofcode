import { inputToNumberArray } from '../shared/common';
const log = console.log;
const rawInput = inputToNumberArray('day6.input.txt', ',');


function processFishEachDay(fishArray){
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

function part1(days) {
    log(`After ${days} days...`)
    let fishes = [...rawInput];
    while(days>0){
        fishes = processFishEachDay(fishes);
        days--;
    }
    log(`Fish population is ${fishes.length}`);
}

function cacheBuilder(days: number,val: number,) {
    if(days == 0){
        return 1;
    }
    let fishes = [val];
    //log('started while')
    while (days > 0) {
        fishes = processFishEachDay(fishes);
        days--;
    }
    return fishes.length;
}

function fishArray(day: number, val: number,){
    return [day,val];

}
function dynamicTable(dayLimit: number): Map<string, number>{
    let table:Map<string,number> = new Map();
    let counter = 0
    
    for(let day=dayLimit; day>0; day--){
        for(let val=8;val>=0;val--){
            let sub_population = cacheBuilder(day,val);
            table.set(fishArray(day,val).toString(),sub_population);
            counter++;
        }
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

function singleFishContribution(days:number,cache:Map<string,number>,input:number[]){

    let fishes = input;//rawInput [3, 4, 3, 1, 2]
    let population = 0;
    
    while (days > 0) {
        //scan for fish in cache
        //move fish to new array
        let remainingFish = [];
        for(let k=0; k<fishes.length;k++){
            if(cache.has(fishArray(days,fishes[k]).toString())){
                population += cache.get(fishArray(days, fishes[k]).toString());
            } else {
                remainingFish.push(fishes[k]);
            }
        }
        fishes = remainingFish;
        if(fishes.length == 0){
            break;
        }

        //process remainng fish
        fishes = processFishEachDay(fishes);
        days--;
    }

    return population;
}


function part2(days,cacheDays){

    let duplicateStarts = decomposeStart();
    let cached_table = dynamicTable(cacheDays);
    let sub_branch_populations: number[] = [];
    
    for(let key=1;key<=5;key++){
        sub_branch_populations[key] = singleFishContribution(days, cached_table,[key]);
    }

    let population = 0;
    for (let key = 1; key <= 5; key++){
        let product = sub_branch_populations[key] * duplicateStarts.get(key);
        population += product;
    }

    log(`After ${days} days...\nThe fish population is ${population}`);

}


// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        part1(80);
        log('--------------------------------------');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        part2(256,128);
        log('--------------------------------------');
        log('\n\n');
    }
}

main(true, true);