function goodPassword(pass){
    //checks to make sure the password is in the correct form.
    if(typeof pass == "string" && pass.length == 8){
        return true;
    }
    else {
        return false;
    }
}

function criteriaOne(pass){
    //password must contain an increasing trigram, abc,cde, etc...
    'use strict';
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var passOne = false;
    for(let a=0; a<6;a++){
        if(passOne){
            break;
        }
        for(let b=0; b<24;b++){
            passOne = passOne || pass.substring(a,a+2) == alphabet.substring(b,b+2);
        }
    }
    console.log(passOne);
    //return passOne;
}

function criteriaTwo(pass){
    //will return true if the password DOES NOT CONTAIN i, l, or o
    'use strict';
    var passTwo;
    passTwo = pass.includes("i") || pass.includes("l") || pass.includes("o");
    //console.log(!passTwo);
    return !passTwo;
}

function criteriaThree(){
    
}
