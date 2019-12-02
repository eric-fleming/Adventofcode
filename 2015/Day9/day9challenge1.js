/*Modules*/

var fs = require('fs');


/*Global Variables*/
var network = fs.readFileSync("day9info.txt","utf8");
var edges = network.split("\n");

var locations = ["Tristram","AlphaCentauri","Snowdin","Tambi","Faerun","Norrath","Straylight","Arbre"];
var permutationmatrix = [];

for(var a=0;a<8;a++){
	permutationmatrix[a]=[];
	for(var b=0;b<8;b++){
		permutationmatrix[a][b]=0;
	};
};
/*Functions to be implemented*/

function codeMatrix(newmatrix,edge){
	var row = newmatrix.length;
	var collumn = newmatrix[0].length;

	for(var e=0;e<edges.length;e++){
		assignEdge(newmatrix,edges[e],locations);
	};
};

function assignEdge(matrix,edge,list){
	var temp1=0;
	var temp2=0;
	var dist = Number(edge.slice(edge.indexOf("= ")+2,edge.length).trim());
	for(var l=0;l<list.length;l++){
		if(edge.search(list[l])>-1 && temp1==0){
			temp1= l;
		}
		else if(edge.search(list[l])>-1){
			temp2=l;
		}
	}
	matrix[temp1][temp2] = dist;
	matrix[temp2][temp1] = dist;
}

/*Instructions to be run*/
codeMatrix(permutationmatrix,edges);
console.log(permutationmatrix);