/*Dependent Modules*/
import { inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;
const info = console.info; //(stuff)=>{}
// day10.input.txt
// ex.10.txt
const rawInput = inputToStringArray('day10.input.txt', '\n');
//console.table(rawInput);

const illegalPointsMap :Map<string, number> = new Map();
illegalPointsMap.set(')',3);
illegalPointsMap.set(']',57);
illegalPointsMap.set('}',1197);
illegalPointsMap.set('>',25137);

const PAIRS:string[] = ['()','[]','{}','<>'];
const OPENCHARS:string[] = PAIRS.map(item => item[0]);
const CLOSECHARS:string[] = PAIRS.map(item => item[1]);

function validPair(open:string,close:string):boolean{
    return PAIRS.includes(open+close);
}

function openTally(char: string): boolean {
    return OPENCHARS.includes(char) ? true : false;
}

function closeTally(char: string): boolean {
    return CLOSECHARS.includes(char) ? true : false;
}


function part1() {

    let lines = [...rawInput];

    let errors = []

    for(let k=0; k<lines.length;k++){
        let line = lines[k];
        let opens = [];

        inner:
        for(let c=0; c<line.length; c++){
            let char = line[c];
            
            if(openTally(char)){
                opens.push(char)
                continue;
            }
            if(closeTally(char)){
                if(!validPair(opens[opens.length-1],char)){
                    //log(`BAD PAIR\t ${opens[opens.length-1]}${char}`);
                    //log(`AT INDEX\t ${c-1},${c}`);
                    errors.push(char);
                    break inner;
                } else{
                    opens.pop();
                }
            }
        }
        

        
    }
    console.table(errors);
    let total = 0;
    errors.forEach( err => {total += illegalPointsMap.get(err)});
    //console.table(errors);
    log(`${total}`);
}



//     > {[]{[(<()>

//open : {([(<[}
//close:

function part2() {

    let answer;
    log(`${answer}`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        log('--------------------------------------');
        part1();
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        log('--------------------------------------');
        part2();
        log('\n\n');
    }
}

main(true, false);