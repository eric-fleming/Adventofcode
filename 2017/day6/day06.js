let memory = [11,11,13,7,0,15,5,5,4,4,1,1,7,1,15,11];
let cycles = 0;
let states = [];



function distribute(mem,ind){
    let oldmem = new Array();
    for(let m=0;m<16;m++){
        oldmem[m] = mem[m];
    }
    states.push(oldmem);
    let stuff = mem[ind];
    //console.log("initial stuff "+stuff);
    mem[ind] = 0;
    ind++;
    while(stuff > 0){
        //console.log("stuff = "+stuff);
        if(ind>15){
            ind-=16;
        }

        mem[ind]+=1;
        ind++;
        stuff--;

    }
}

function inStateLog(){
    /*if(states.length == 0){
        console.log("Initial run!");
        return false;
    }*/
    let seen = false;
    for(let s=0;s<states.length;s++){
        let all = true;
        //console.log("states["+s+"] = "+states[s]);
        let temp = states[s];
        for(let m=0;m<16;m++){
            if(temp[m] != memory[m]){
                all = false;
                break;
            }
        }
        seen = seen || all;
        if(seen){
            console.log("The states index is = "+s);
            break;
        }
    }
    //console.log("seen is "+seen);
    return seen;
}

while(!inStateLog()){
    let max = Math.max(...memory);
    let maxindex = memory.indexOf(max);


    //console.log("before distribute, mem is "+memory);
    distribute(memory,maxindex);
    //console.log("after distribute, mem is "+memory);

    cycles++;
    if(cycles>100000){
        console.log("BREAK HIT LIMIT");
        break;
    }
}
console.log("This took "+cycles+" cycles!");
