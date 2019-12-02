/*Dependent Modules*/
var fs = require('fs');

/*Variable Declarations*/
var directions = fs.readFileSync('day3info.txt','utf8');
var origin = new location(0,100,100);
var triplog = [];
triplog[0]=origin;
var count = 0;
var uniquehomes = 0;

/*Second Level of constants*/
var presentmatrix = [];
for(var i=0;i<200;i++){
  presentmatrix[i]=[];
};





/*Functions that build the preogram*/
function location(n,x,y){
  this.position = n;
  this.location = [x,y];
  this.x = x;
  this.y = y;
};

function move(locale,vector){
  var nextlocale = new location();
  nextlocale.position = locale.position+1;
  nextlocale.x = locale.x + vector[0];
  nextlocale.y = locale.y + vector[1];
  nextlocale.location = locale.location = [nextlocale.x,nextlocale.y];
  return nextlocale;
};

function currentdirection(string){
  if(string === "<"){
    return [-1,0];
  }
  if(string === ">"){
    return [1,0];
  }
  if(string === "^"){
    return [0,1]
  }
  if(string === "v"){
    return [0,-1];
  }
  else {
    console.log("No direction found or invalid direction entered.");
    return [0,0];
  }
};

function counthomes(matrix){
  for(var i=0;i<200;i++){
    for(var j=0;j<200;j++){
      if(presentmatrix[i][j]===1){
        uniquehomes++;
      }
    }
  }
};

/*Commands which execute the program*/
console.log("starting program...");
while(count<directions.length){
  triplog[count+1]=move(triplog[count],currentdirection(directions[count]));
  count++;
}
count=0;
while(count<directions.length){
  presentmatrix[triplog[count].x][triplog[count].y] = 1;
  count++;
}
counthomes(presentmatrix);
console.log(uniquehomes);
console.log("Done!!")





// console.log("Santa visited "+triplog.length+" non-unique homes on Christmas!");
// console.log(directions.length);

