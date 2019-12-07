/*Dependent Modules*/
import { readInput, inputToArray, inputToNumberArray, inputToStringArray } from '../shared_functions/common';
import { IntCodeComputer } from '../day5/intCodeComputer';
const rawInput = readInput('day7input.txt');


function firstChallenge() { 




}

function generatePermutations(size:number) {
    let items:number[] = [];
    let used:boolean[] = [];
    let permutations:any[] = [];

    // initialize
    for(let i = 1; i <= size; i++) {
        items[i] = i;
        used[i] = false;
    }

    for (let a = 1; a <= size; a++) { 
        used[a] = true;

        for (let b = 1; b <= size; b++) { 
            if(used[b]){ continue; } // skip this index
            else{used[b] = true}

            for (let c = 1; c <= size; c++) { 
                if (used[c]) { continue; } // skip this index
                else { used[c] = true }

                for (let d = 1; d <= size; d++) { 
                    if (used[d]) { continue; } // skip this index
                    else { used[d] = true }

                    for (let e = 1; e <= size; e++) { 
                        if (used[e]) { continue; } // skip this index
                        else {
                            permutations.push([a,b,c,d,e]);
                         }
                    }
                    used[d] = false;
                }
                used[c] = false;
            }
            used[b] = false;
        }
        used[a] = false;
    }

    return permutations;

}

const perms = generatePermutations(5)
console.table(perms);
console.log(`---- Number of permutations ----`);
console.log(perms.length);


function secondChallenge() { }

// main method to run the program
function main(first: boolean, second: boolean) {
    let permuation = 1;
    const Computer = new IntCodeComputer();
    Computer.loadInstructions(permuation, 'day7input.txt');
    Computer.run();
    Computer.reset();


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

//main(false, false);
