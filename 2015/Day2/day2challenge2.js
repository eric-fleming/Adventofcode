/*Dependent Modules*/
var fs = require('fs');

/*Variable Declarations*/
var boxes = fs.readFileSync('day2challengeinfo.txt','utf8');
var boxarray = boxes.split("\n");
var total = 0;


/*Functions which implement the program*/
function ribbon(l,w,h){
  return Math.min(2*l+2*w,2*l+2*h,2*h+2*w);
};

function bow(l,w,h){
  return (l*w*h);
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
  total = (total+ribbon(l,w,h)+bow(l,w,h));
};
console.log(total);
