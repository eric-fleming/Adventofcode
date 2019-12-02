let fs = require('fs');

let file = fs.readFileSync('text07.txt','utf8');
//console.log(file);
let lines = file.split("\n");
for(let n=0;n<lines.length-1;n++){
    let i = lines[n].indexOf("\r");
    lines[n] = lines[n].substring(0,i);
}
//console.log(lines[4]);

function processNode(line){
    //console.log(line);
    let leftparindex = line.indexOf("(");
    let rightparindex = line.indexOf(")");
    let arrowindex = line.indexOf("->");

    this.name = line.substring(0,leftparindex-1);
    this.weight = Number(line.substring(leftparindex+1,rightparindex));

    let clist = line.substring(rightparindex+5,line.length);
    if(clist === ""){
        this.children = [];
    }
    else{
        this.children = clist.split(", ");
    }

}
//console.log(new processNode(lines[4]));

//build a list of process nodes
let nodes = [];
for(let n=0;n<lines.length-1;n++){
    nodes[n] = new processNode(lines[n]);
}


//sort nodes by length of children array
/*
for(let a=0;a<nodes.length;a++){
    for(let b=a+1;b<nodes.length;b++){
        if(nodes[a].children.length < nodes[b].children.length){
            let temp = new Object();
            temp = nodes[b];
            nodes[b] = nodes[a];
            nodes[a] = temp;
        }
    }
}
*/
/*
console.log(nodes[0]);
console.log(nodes[10]);
console.log(nodes[200]);
console.log(nodes[400]);
console.log(nodes[500]);
console.log(nodes[1000]);
*/

//Makes a redundant list of children names.
let childrenlist = [];
for(let c=0;c<nodes.length;c++){
    let clen = nodes[c].children.length;
    if(clen == 0){
        continue;
    }
    else{
        for(let d=0;d<clen;d++){
            childrenlist.push(nodes[c].children[d])
        }
    }
}

//search childrenlist for the absence of the name: that one must be the root.
for(let n=0;n<nodes.length;n++){
    let seen = false;
    for(let c=0;c<childrenlist.length;c++){
        if(nodes[n].name === childrenlist[c]){
            seen = true;
            break;
        }
    }
    if(!seen){
        console.log(nodes[n].name+ " was not seen in the list of children");
        console.log("its index in the nodes array was "+n);
        console.log(nodes[n].children);
    }
}

/*
console.log("====== PART 2 ======");
let root = 21;
let checks = 0;
while(nodes[root].children.length > 0){
    let len = nodes[root].children.length;
    let childweights = new Array(len);

    let children = nodes[root].children;
    let childIndex = new Array(len);

    //stores child indexes in an array
    for(let n=0;n<nodes.length;n++){
        for(let c=0;c<len;c++){
            if(nodes[n].name ===children[c]){
                childIndex[c] = n;
            }
        }
    }

    //stores child weights in an array
    for(let c=0;c<len;c++){
        childweights[c] = nodes[childIndex[c]].weight;
        //console.log(childweights[c]);

    }

    checks++;
    if(checks >0){
        console.log("Test");
        break;
    }
    if(checks >10){
        console.log("Break too high");
        break;
    }
}
*/

function Tree(n){
    //same
    this.name = n.name;
    this.weight = n.weight;
    //search nodes list for processnodes
    this.childrenIndexes = [];
    for(let m=0;m<n.children.length;m++){
        for(let a=0;a<nodes.length;a++){
            if(nodes[a].name == n.children[m]){
                this.childrenIndexes.push(a);
            }
        }
    }
    this.print = function(){
        console.log("Your children have indexes ["+this.childrenIndexes+"]");
    }


    this.branches = [];
    for(let c=0;c<this.childrenIndexes.length;c++){
        this.branches.push(new Tree(nodes[this.childrenIndexes[c]]));
    }


    this.buildTree = function(){
        if(this.childrenIndexes.length >0){
            for(let c=0;c<this.childrenIndexes.length;c++){
                this.branches[c].buildTree();
            }
        }
        else{

        }
    }

    /*
    this.branch = function(){
        if(this.childrenIndexes.length != 0){
            for(let c=0;c<this.childrenIndexes.length;c++){
                let child = nodes[this.childrenIndexes[c]];
                //console.log(child);
                let leaf = new Tree(child);
                //console.log(leaf);
                if(leaf.childrenIndexes.length == 0){
                    console.log("branch "+c+" has weight "+child.weight);
                }
                else{
                    let temp = child.weight;
                    for(let t=0;t<leaf.childrenIndexes.length;t++){
                        console.log("----"+nodes[leaf.childrenIndexes[t]].weight);
                        temp += nodes[leaf.childrenIndexes[t]].weight;
                    }
                    console.log("branch "+c+" has weight "+temp);
                }
            }
        }
        else{
            console.log("branch has weight "+this.weight);
        }
    }
    */
}
let root = new Tree(nodes[150]);
root.print();

root.buildTree();
console.log(root.branches);
