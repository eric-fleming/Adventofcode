/*Dependent Modules*/
import { readInput } from '../shared_functions/common';




function extractLayers(imageData:any, width:number, height:number){
    let layerSize = width * height;
    
    console.log(`input length = ${imageData.length}`);
    let layers: string[] = [];
    // builds the layers
    for (let p = 0; p < imageData.length; p = p + layerSize) {
        layers[p / layerSize] = imageData.substring(p, p + layerSize);
    }
    return layers;
}


function firstChallenge(fileName: string, width: number, height: number) { 

    let imageData = readInput(fileName);
    const layers = extractLayers(imageData, width, height);
    let layerSize = width * height;
    let numberOfLayers = Math.floor(imageData.length / layerSize);
    //console.table(layers);

    let layerZeroCount = new Array(numberOfLayers);
    layerZeroCount.fill(0);

    // find index of layer with least number of zeros
    for (let i = 0; i < numberOfLayers; i++) {
        let zeroCount = 0;
        let str = layers[i];
        for (let j = 0; j < layerSize; j++) {
            if(str[j] === '0'){
                zeroCount++;
            }
        }
        layerZeroCount[i] = zeroCount;
    }

    let min = Math.min(...layerZeroCount);
    let indexOfMin = layerZeroCount.indexOf(min);

    console.log(`The minimum zero count was ${min}, found at layer ${indexOfMin}`);
    console.log(`---- layer zero count ----`)
    console.table(layerZeroCount);

    let oneCount = 0;
    let twoCount = 0;
    let targetLayer = layers[indexOfMin];
    for(let a = 0; a < layerSize; a++){
        if (targetLayer[a] === '1'){
            oneCount++;
        }
        else if (targetLayer[a] === '2'){
            twoCount++;
        }
    }

    console.log(`==================`);
    console.log(`oneCount * twoCount == ${oneCount * twoCount}`);

}







function secondChallenge(fileName: string, width: number, height: number) {
    // facts
    let layerSize = width * height;
    let imageData = readInput(fileName);
    // The layers of the image
    const layers = extractLayers(imageData, width, height);

    let image = layers[0];
    printLayer(image,width,height);
    //console.table(layers);
    /** 
    for (let p = 0; p < layers.length; p++) {
        printLayer(layers[p], width, height);
    }*/

    loop1:
    for (let p = 1; p < layers.length; p++) {
        let currentLayer = layers[p];
        //printLayer(currentLayer, width, height);
        let temp;
        loop2:
        for (let r = 0; r < layerSize; r++) {
            if (image[r] === '2') {
                temp = image.substring(0, r) + currentLayer[r] + image.substring(r + 1);
                image = temp;
            }
        }
        
        /*
        if (image.indexOf('2') === -1) {
            console.log(`No 2's after layer ${p}`);
            break loop1;
        }*/
    }
    
    console.log('---- Executing test ----');
    printLayer(image, width, height);

 }





function printLayer(layer: string, width: number, height: number) {
    //console.log(`Layer == ${layer}`);
    let message:string [] = layer.split('');
    message = message.map(readable);
    let transformedLayer = message.join('');
    let rows = layer.length/width;
    for (let r = 0; r < layer.length; r = r + width) {
        let row = transformedLayer.substring(r,r + width);
        console.log(row);
    }
    console.log(`======\n`);
}

function readable(character:string){

    if(character === '0'){
        return ' ';
    }
    else if(character === '1'){
        return '#';
    }
}



// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge('day8input.txt',25,6);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge('day8input.txt',25,6);
        console.log('------  Challend Completed -----------');
    }
}

main(false, true);

function test(){
    let imageData = '0222112222120000';
    let width = 2;
    let height = 2;
    // facts
    let layerSize = width * height;
    // The layers of the image
    const layers = extractLayers(imageData, width, height);

    let image = layers[0];
    console.table(layers);
    
    for(let p = 0; p < layers.length; p++){
        printLayer(layers[p], 2, 2);
    }

    loop1:
    for (let p = 1; p < layers.length; p++) {
        let currentLayer = layers[p];
        printLayer(currentLayer,2,2);
        loop2:
        for (let r = 0; r < layerSize; r++) {
            if (image[r] === '2') {
                let temp = image.substring(0, r) + currentLayer[r] + image.substring(r + 1);
                image = temp;
            }
        }
        if (image.indexOf('2') === -1) {
            console.log(`No 2's after layer ${p}`);
            break loop1;
        }
    }
    console.log(`---- loop has ended ----`);
    console.log('Executing test');
    printLayer(image, width, height);
}

//test();
