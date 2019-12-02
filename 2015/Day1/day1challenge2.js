/*Dependent Modules*/
var fs = require('fs');

/*Variable Declarations*/
var santawalk = fs.readFileSync('day1challenge1.txt','utf8');
var floornumber = 0;
var currentfloor = 0;

/*Program execution*/
while(floornumber != -1){
  if(santawalk.charAt(currentfloor) ==="("){
    floornumber++;
    currentfloor++
  }
  else {
    floornumber--;
    currentfloor++;
  }
};
console.log(currentfloor);
