/*Dependent Modules*/
var fs = require('fs');


/*Variable Declarations*/
var santaslist = fs.readFileSync('day5info.txt','utf8');
var wordlist = santaslist.split("\n")
var nicewords = 0;

/*Function to help implement the requirements*/

function isnice(word){
    if(niceone(word) && nicetwo(word)){
        return true;
    }
    else
        return false;
}


function niceone(word){
    var wordarray =[];
    var doubledouble = false;

    for(var a=0;a<word.length-1;a++){
        wordarray[a]=word.substr(a,2);
    };

    for(var i=0;i<wordarray.length;i++){
        for(var k=i+2;k<wordarray.length;k++){
            if(wordarray[i]==wordarray[k]){
                doubledouble = true;
            }
        }
    };
    return doubledouble;
}

function nicetwo(word){
    var containsletter = false;
    for(var a=0;a<word.length-2;a++){
        if(word.charAt(a)==word.charAt(a+2)){
            containsletter = true;
        }
    }
    return containsletter;
}



/*Instructions to be executed*/
for(var u=0;u<wordlist.length;u++){
    if(isnice(wordlist[u])){
        nicewords++;
    };
};

console.log("There are "+nicewords+" words on Santa's nice list.");