let fs = require('fs');

let file = fs.readFileSync('text04.txt','utf8');
//console.log(file);
let lines = file.split("\n");
//console.log(lines);
let inputarray = [];

for(let s=0;s<lines.length-1;s++){
    //row of input
    lines[s] = lines[s].substring(0,lines[s].length-1);
    inputarray[s] = lines[s].split(" ");
    console.log(inputarray[s]);
}

let validcount = 0;
for(let a=0;a<inputarray.length;a++){
    let temp = inputarray[a];
    let valid = true;
    for(let b=0;b<temp.length;b++){
        for(let c=b+1;c<temp.length;c++){
            if(temp[b] == temp[c]){
                valid = false;
                break;
            }
        }
        if(!valid){
            break;
        }
    }
    if(valid){
        validcount++;
    }
}


function scorecard(word){
    let card=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(let w=0;w<word.length;w++){
        card[word.charCodeAt(w)-97]++;
    }
    return card;
}

function deeparrayequals(card1,card2){
    if(card1.length != card2.length){
        return false;
    }
    else{
        for(let c=0;c<card1.length;c++){
            if(card1[c] != card2[c]){
                return false;
            }
        }
        return true;
    }
}
let validcount2 = 0;
for(let a=0;a<inputarray.length;a++){
    let temp = inputarray[a];
    let valid = true;
    for(let b=0;b<temp.length;b++){
        for(let c=b+1;c<temp.length;c++){
            let scoreB = scorecard(temp[b]);
            let scoreC = scorecard(temp[c]);
            if(deeparrayequals(scoreB,scoreC)){
                valid = false;
                break;
            }
        }
        if(!valid){
            break;
        }
    }
    if(valid){
        validcount2++;
    }
}
console.log("The number of valid passphrases is = "+validcount);
console.log("Number of non-anagrams = "+validcount2);
/*
    - build a score card for letters
    - build a deep equals boolean function for arrays;
    - search the row: if two lengths are the same, compare their score cards
    - return true or return false
*/
