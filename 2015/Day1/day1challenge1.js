/*Dependent Modules*/
var fs = require('fs');

/*Variable Declarations*/
var santawalk = fs.readFileSync('day1challenge1.txt','utf8');
var floornumber = 0;

/*Program execution*/
console.log(typeof santawalk);
for(var a=0;a<santawalk.length;a++){
  if(santawalk.charAt(a) ==="("){
    floornumber++;
  }
  else {
    floornumber--;
  }
};
console.log("Santa is on the "+floornumber+"th floor.")
