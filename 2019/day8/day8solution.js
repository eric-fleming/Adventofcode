"use strict";
exports.__esModule = true;
/*Dependent Modules*/
var common_1 = require("../shared_functions/common");
function extractLayers(imageData, width, height) {
    var layerSize = width * height;
    console.log("input length = " + imageData.length);
    var layers = [];
    // builds the layers
    for (var p = 0; p < imageData.length; p = p + layerSize) {
        layers[p / layerSize] = imageData.substring(p, p + layerSize);
    }
    return layers;
}
function firstChallenge(fileName, width, height) {
    var imageData = common_1.readInput(fileName);
    var layers = extractLayers(imageData, width, height);
    var layerSize = width * height;
    var numberOfLayers = Math.floor(imageData.length / layerSize);
    //console.table(layers);
    var layerZeroCount = new Array(numberOfLayers);
    layerZeroCount.fill(0);
    // find index of layer with least number of zeros
    for (var i = 0; i < numberOfLayers; i++) {
        var zeroCount = 0;
        var str = layers[i];
        for (var j = 0; j < layerSize; j++) {
            if (str[j] === '0') {
                zeroCount++;
            }
        }
        layerZeroCount[i] = zeroCount;
    }
    var min = Math.min.apply(Math, layerZeroCount);
    var indexOfMin = layerZeroCount.indexOf(min);
    console.log("The minimum zero count was " + min + ", found at layer " + indexOfMin);
    console.log("---- layer zero count ----");
    console.table(layerZeroCount);
    var oneCount = 0;
    var twoCount = 0;
    var targetLayer = layers[indexOfMin];
    for (var a = 0; a < layerSize; a++) {
        if (targetLayer[a] === '1') {
            oneCount++;
        }
        else if (targetLayer[a] === '2') {
            twoCount++;
        }
    }
    console.log("==================");
    console.log("oneCount * twoCount == " + oneCount * twoCount);
}
function secondChallenge(fileName, width, height) {
    // facts
    var layerSize = width * height;
    var imageData = common_1.readInput(fileName);
    // The layers of the image
    var layers = extractLayers(imageData, width, height);
    var image = layers[0];
    printLayer(image, width, height);
    //console.table(layers);
    /**
    for (let p = 0; p < layers.length; p++) {
        printLayer(layers[p], width, height);
    }*/
    loop1: for (var p = 1; p < layers.length; p++) {
        var currentLayer = layers[p];
        //printLayer(currentLayer, width, height);
        var temp = void 0;
        loop2: for (var r = 0; r < layerSize; r++) {
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
function printLayer(layer, width, height) {
    //console.log(`Layer == ${layer}`);
    var message = layer.split('');
    message = message.map(readable);
    var transformedLayer = message.join('');
    var rows = layer.length / width;
    for (var r = 0; r < layer.length; r = r + width) {
        var row = transformedLayer.substring(r, r + width);
        console.log(row);
    }
    console.log("======\n");
}
function readable(character) {
    if (character === '0') {
        return ' ';
    }
    else if (character === '1') {
        return '#';
    }
}
// main method to run the program
function main(first, second) {
    if (first) {
        console.log('------  First Challenge Started ------');
        firstChallenge('day8input.txt', 25, 6);
        console.log('------  Challend Completed -----------');
    }
    if (second) {
        console.log('------  Second Challenge Started -----');
        secondChallenge('day8input.txt', 25, 6);
        console.log('------  Challend Completed -----------');
    }
}
main(false, true);
function test() {
    var imageData = '0222112222120000';
    var width = 2;
    var height = 2;
    // facts
    var layerSize = width * height;
    // The layers of the image
    var layers = extractLayers(imageData, width, height);
    var image = layers[0];
    console.table(layers);
    for (var p = 0; p < layers.length; p++) {
        printLayer(layers[p], 2, 2);
    }
    loop1: for (var p = 1; p < layers.length; p++) {
        var currentLayer = layers[p];
        printLayer(currentLayer, 2, 2);
        loop2: for (var r = 0; r < layerSize; r++) {
            if (image[r] === '2') {
                var temp = image.substring(0, r) + currentLayer[r] + image.substring(r + 1);
                image = temp;
            }
        }
        if (image.indexOf('2') === -1) {
            console.log("No 2's after layer " + p);
            break loop1;
        }
    }
    console.log("---- loop has ended ----");
    console.log('Executing test');
    printLayer(image, width, height);
}
//test();
