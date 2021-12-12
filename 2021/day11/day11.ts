/*Dependent Modules*/
import { inputToStringArray } from '../shared/common';
import { padNumberMatrix, Point, d8Neighborhood, convertToNumberMatrix } from '../shared/matrix';
const log = console.log;
const table = console.table;

function increaseAll(paddedMatrix: number[][]): number[][] {
    let rows = paddedMatrix.length;
    let cols = paddedMatrix[0].length;
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (paddedMatrix[r][c] < 10) {
                paddedMatrix[r][c] += 1
            }
        }
    }
    return paddedMatrix;
}

function increaseNeighborhood(point: Point, matrix: number[][]): number[][] {
    let neighborhood = d8Neighborhood(point);
    neighborhood.forEach(point => {
        if (matrix[point.y][point.x] < 10) {
            matrix[point.y][point.x] += 1;
        }
    });

    return matrix;
}

function findFlashes(matrix: number[][]): number[][] {
    let maxEnergyCoordinates: number[][] = []
    let rows = matrix.length;
    let cols = matrix[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] == 10) {
                maxEnergyCoordinates.push([c, r]);
            }
        }
    }
    return maxEnergyCoordinates;
}

function resetFlashed(paddedMatrix: number[][]) {
    let rows = paddedMatrix.length;
    let cols = paddedMatrix[0].length;
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (paddedMatrix[r][c] == 10) {
                paddedMatrix[r][c] = 0;
            }
        }
    }
    return paddedMatrix;
}

function compute(part, steps, source) {
    const rawInput = inputToStringArray(source, '\r\n');
    let cavern = [...rawInput];
    let cavernMatrix: number[][] = padNumberMatrix(convertToNumberMatrix(cavern), -Infinity);

    // kickoff
    let flashes = 0;
    let step = 0;
    //log(`Before any steps`);
    //table(cavernMatrix);

    let flash_subtotal = 0;

    // iterate
    while (step < steps) {
        // update all
        cavernMatrix = increaseAll(cavernMatrix);

        // find flashes
        let flashCoordinates = findFlashes(cavernMatrix);
        let hasFlashedMap: Map<string, boolean> = new Map();

        while (flashCoordinates.length > 0) {
            // trigger flash
            flashCoordinates.forEach(point => {
                hasFlashedMap.set(`${point[0]},${point[1]}`, true);
                cavernMatrix = increaseNeighborhood({ x: point[0], y: point[1] }, cavernMatrix);
                flash_subtotal += 1;
            });

            //look for additional flashes
            let updatedFlashCoordinates = findFlashes(cavernMatrix);
            flashCoordinates = [];
            updatedFlashCoordinates.forEach(point => {
                if (!hasFlashedMap.has(`${point[0]},${point[1]}`)) {
                    flashCoordinates.push(point);
                }
            });
        }

        cavernMatrix = resetFlashed(cavernMatrix);
        flashes += flash_subtotal;

        step += 1;
        //log(`After day ${step}`);
        //table(cavernMatrix);

        // abort! we found it
        if (part == 2 && flash_subtotal == 100) {
            break;
        }

        flash_subtotal = 0;

    }

    log(`step: ${step}`);
    log(`flash count: ${flashes}`);
}

// main method to run the program
function main(first: boolean, second: boolean) {
    if (first) {
        log('--------------------------------------');
        log('----------  First Challenge ----------');
        log('--------------------------------------');
        //compute(1,2,'tiny.txt');
        //compute(1,10, 'ex11.txt');
        //compute(1,100, 'ex11.txt');
        compute(1, 100, 'day11input.txt');
        log('\n\n');
    }
    if (second) {
        log('--------------------------------------');
        log('----------  Second Challenge ---------');
        log('--------------------------------------');
        compute(2, 1000, 'day11input.txt');
        log('\n\n');
    }
}

main(true, true);