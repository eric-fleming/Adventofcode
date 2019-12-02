//Dependent Modules
var md5 = require('md5');

// Variable Declarations
var key  = "iwrupvqb";
var count = 0;
//Functions which aide the program execution.

function newkey(key,count){
	return String(key+count);
};

function passing(value){
	var crypt = md5(value);
	if(crypt.substr(0,6)==="000000"){
		console.log(crypt);
		return true;
	}
	else
		return false;
};


//Instructions to be executed.

while(!passing(newkey(key,count))){
	count++;
};

console.log("The number which produces the minimal hash is "+ count);