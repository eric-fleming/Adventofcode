/*Dependent Modules*/
import { inputToStringArray } from '../shared/common';
const log = console.log;
const table = console.table;
const info = console.info; //(stuff)=>{}
// day10.input.txt
// ex.10.txt
const rawInput = inputToStringArray('ex.10.txt', '\n');
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
    //console.table(errors);
    let total = 0;
    errors.forEach( err => {total += illegalPointsMap.get(err)});
    //console.table(errors);
    log(`${total}`);
}

const autoCompletePointsMap = new Map();
autoCompletePointsMap.set(')', 1);
autoCompletePointsMap.set(']', 2);
autoCompletePointsMap.set('}', 3);
autoCompletePointsMap.set('>', 4);

function autoPointTotal(remaining:string[]):number{
    let total = 0;
    for (let k =0; k<remaining.length;k++){
        let subtotal = (total * 5 + autoCompletePointsMap.get(remaining[k]));
        total = subtotal;
    }
    return total;
}


function part2() {

    let lines = [...rawInput];

    let incompletes = [];

    for (let k = 0; k < lines.length; k++) {
        let line = lines[k];
        let opens = [];
        let incomplete = true;
        inner:
        for (let c = 0; c < line.length; c++) {
            let char = line[c];

            if (openTally(char)) {
                opens.push(char)
                continue;
            }
            if (closeTally(char)) {
                if (!validPair(opens[opens.length - 1], char)) {
                    incomplete = false;
                    break inner;
                } else {
                    opens.pop();
                }
            }
        }

        if(incomplete){
            incompletes.push({
                line:lines[k],
                remaining: opens
            });
        }

    }

    table(incompletes);

    const beginnings = incompletes.map(item => item.remaining);
    //table(beginnings);
    const endings = beginnings.map(list => {
        let flipped = list.map(item => CLOSECHARS[OPENCHARS.indexOf(item)]);
        flipped.reverse();
        return flipped;
    });
    table(endings);

    const scores = endings.map(list => autoPointTotal(list));
    scores.sort((a,b)=>a-b);

    log('scores');
    table(scores);
    log(scores[Math.floor(scores.length/2)]);

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

main(false, true);