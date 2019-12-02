/*Modules*/

var fs = require('fs');


/*Global Variables*/
var dancinglights = fs.readFileSync("day6info.txt","utf8");
var dancesteps = dancinglights.split("\n");

var ALLOFTHELIGHTS = [];

for(var a=0;a<1000;a++){
	ALLOFTHELIGHTS[a]=[];
	for(b=0;b<1000;b++){
		ALLOFTHELIGHTS[a][b]=0;
	};
};
/*ALLOFTHELIGHTS IS DEFINED*/


/*Functions that help parse the instructions*/

function contains(string,substring){
	if(string.indexOf(substring) > -1){
		return true;
	}
	else
		return false;
}

function translate(instruction){
	var lightbrite = {
		action: "",
		xrange: [0,0],
		yrange: [0,0]
	};

	if(contains(instruction,"turn on ")){
		lightbrite.action = "turnon";
		var corners = twocorners(instruction, "turn on ");
		lightbrite.xrange = [corners[0], corners[1]];
		lightbrite.yrange = [corners[2], corners[3]];
	}
	else if(contains(instruction,"turn off ")){
		lightbrite.action = "turnoff";
		var corners = twocorners(instruction, "turn off ");
		lightbrite.xrange = [corners[0], corners[1]];
		lightbrite.yrange = [corners[2], corners[3]];
	}
	else if(contains(instruction,"toggle ")){
		lightbrite.action = "toggle";
		var corners = twocorners(instruction, "toggle ");
		lightbrite.xrange = [corners[0], corners[1]];
		lightbrite.yrange = [corners[2], corners[3]];
	}
	return lightbrite;
}

function twocorners(string, action){
	var topleft = string.slice(action.length, string.search("through")).trim();
	var bottomright = string.slice(string.indexOf("through")+7, string.length).trim();
	var corners =[];
	corners[0] = Number(topleft.slice(0,topleft.indexOf(",")));
	corners[1] = Number(bottomright.slice(0,bottomright.indexOf(",")));
	corners[2] = Number(topleft.slice(topleft.indexOf(",")+1,topleft.length));
	corners[3] = Number(bottomright.slice(bottomright.indexOf(",")+1,bottomright.length));
	return corners;
}

function Dance(object){
	if(object.action =="turnon"){
		for(var f=object.xrange[0];f<=object.xrange[1];f++){
			for(var g=object.yrange[0];g<=object.yrange[1];g++){
				(ALLOFTHELIGHTS[f][g])++;
			}
		}
	}
	else if(object.action =="turnoff"){
		for(var f=object.xrange[0];f<=object.xrange[1];f++){
			for(var g=object.yrange[0];g<=object.yrange[1];g++){
				if(ALLOFTHELIGHTS[f][g]>= 1){
					(ALLOFTHELIGHTS[f][g])--;
				}
			}
		}
	}
	else if(object.action =="toggle"){
		for(var f=object.xrange[0];f<=object.xrange[1];f++){
			for(var g=object.yrange[0];g<=object.yrange[1];g++){
				ALLOFTHELIGHTS[f][g]+=2;
			}
		}
	}
}
/*Instructions to be run*/

for(var p=0;p<dancesteps.length;p++){
	var lightbrite = translate(dancesteps[p]);
	Dance(lightbrite);
};
console.log("Your Christmas lights are POP'N");
console.log("Your brightness level is at...")

var brightometer=0;
for(var a=0;a<1000;a++){
	for(b=0;b<1000;b++){
		brightometer+=ALLOFTHELIGHTS[a][b];
	};
};
console.log(brightometer);