import { printLayer, extractLayers } from './day8solution';

function test() {
    let imageData = '0222112222120000';
    let width = 2;
    let height = 2;
    // facts
    let layerSize = width * height;
    // The layers of the image
    const layers = extractLayers(imageData, width, height);

    let image = layers[0];
    console.log(`Printing layers unformatted`);
    console.table(layers);

    console.log(`Printing layers formatted`);
    for (let p = 0; p < layers.length; p++) {
        printLayer(layers[p], 2, 2);
    }

    loop1:
    for (let p = 1; p < layers.length; p++) {
        let currentLayer = layers[p];
        printLayer(currentLayer, 2, 2);
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
    console.log('------ Printing final image ------');
    printLayer(image, width, height);
}

test();