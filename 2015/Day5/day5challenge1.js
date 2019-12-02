/*Dependent Modules*/
var fs = require('fs');


/*Variable Declarations*/
var santaslist = fs.readFileSync('day5info.txt','utf8');
var wordlist = santaslist.split("\n")
var nicewords = 0;

/*Functions to help Implement the program*/

function isnice(string){
	return (niceone(string) && nicetwo(string) && nicethree(string));
};

function niceone(string){
	var vowelcount=0;
	var vowels = ["a","e","i","o","u"];
	for(var a=0;a<string.length;a++){
		for(var v=0;v<5;v++){
			if(string.charAt(a)===vowels[v]){
				vowelcount++;
			}
		}
	}
	if(vowelcount>2){
		return true;
	}
	else {
		return false;
	}
};

function nicetwo(string){
	var double = false;
	for(var i=0;i<26;i++){
		if(loop(string,doubleascii(i))){
			double = true;
		}
	};
	return double;
};
function doubleascii(number){
	var temp = String.fromCharCode(number+97);
	temp=String(temp);
	temp=temp+temp;
	return temp;
}
function loop(string,letter){
	var containsletter = false;
	for(var a=0;a<string.length-1;a++){
		if(string.substr(a,2)==letter){
			containsletter = true;
		}
	}
	return containsletter;
};


function nicethree(string){
	var condition = true;
	var doubles = ["ab","cd","pq","xy"];
	for(var a=0;a<string.length;a++){
		for(var v=0;v<5;v++){
			if(string.substr(a,2)===doubles[v]){
				condition = false;
			}
		}
	}
	return condition;
};

function consecutiveascii(number){
	var temp1 = String.fromCharCode(number+97);
	var temp2 = String.fromCharCode(number+1+97);
	var temp = temp1+temp2;
	return temp;
}

/*Instructions to execute to fulfill the requirements*/
for(var i=0;i<wordlist.length;i++){
	if(isnice(wordlist[i])){
		nicewords++;
	}
}


console.log("**********************************************************");
console.log("This is how many NICE words there are in Santa's List...");
console.log(nicewords);
console.log("Merry Christmas!!");

/*
else{
		console.log("FAILED: "+wordlist[i]);
		if(!niceone(wordlist[i])){console.log("Has: <3 Vowels");}
		if(!nicetwo(wordlist[i])){console.log("Has: No Double Letter");}
		if(niceone(wordlist[i])){console.log("Has: Has consecutive letters");}

	}


*/
