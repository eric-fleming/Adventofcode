/*Dependent Modules*/
var fs = require('fs');

/*Variable Declarations*/
var boxes = fs.readFileSync('day2challengeinfo.txt','utf8');
var boxarray = boxes.split("\n");
var total = 0;


/*Functions which implement the program*/
function surfacearea(l,w,h){
  return 2*(l*w+l*h+w*h);
};

function extrapaper(l,w,h){
  return Math.min(l*w,w*h,l*h);
};

/*Takes a string of dimensions and outputs an 3-dimensional array with number values*/
function splitline(string){
  var subarray=string.split("x");
  for(var i=0;i<subarray.length;i++){
    subarray[i]=Number(subarray[i]);
  };
  return subarray;
}
/*Directions to be executed*/
for(var a=0;a<boxarray.length;a++){
  var temparray = splitline(boxarray[a]);
  var l= temparray[0];
  var w=temparray[1];
  var h=temparray[2];
  total = (total+surfacearea(l,w,h)+extrapaper(l,w,h));
};
console.log(total);
