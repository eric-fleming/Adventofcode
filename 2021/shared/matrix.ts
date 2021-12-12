
export interface Point {
    x: number;
    y: number;
}

export function count(matrix:any[][], val:any):number{
    let rows = matrix.length;
    let cols = matrix[0].length;
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === val ) {
                count += 1;
            }
        }
    }
    return count;
}


export function d4Neighborhood(p:Point):Point[]{
    let neighborhood = [];
    neighborhood.push({x:p.x-1,y:p.y});
    neighborhood.push({ x:p.x+1, y:p.y});
    neighborhood.push({ x:p.x, y:p.y-1});
    neighborhood.push({ x:p.x, y:p.y+1});
    return neighborhood;
}

export function d8Neighborhood(p: Point): Point[]{
    let neighborhood = d4Neighborhood(p);
    neighborhood.push({ x: p.x - 1, y: p.y - 1 });
    neighborhood.push({ x: p.x + 1, y: p.y - 1 });
    neighborhood.push({ x: p.x - 1, y: p.y + 1 });
    neighborhood.push({ x: p.x + 1, y: p.y + 1 });
    return neighborhood;
}

export function padInput(list: string[], padChar:string) {
    let paddedList = [];
    let cols = list[0].length;
    paddedList.push(padChar.repeat(cols + 2));
    list.forEach(line => paddedList.push(padChar + line + padChar))
    paddedList.push(padChar.repeat(cols + 2));

    return paddedList
}

export function convertToMatrix(list: string[]) {
    let rows = list.length;
    let matrix = new Array(rows);
    for (let k = 0; k < rows; k++) {
        matrix[k] = list[k].split('')
    }
    return matrix;
}


export function padNumberMatrix(matrix:number[][], padChar: number):number[][] {
    let paddedMatrix = [];
    for(let k=0; k<matrix.length;k++){
        let paddedRow = matrix[k];
        paddedRow.unshift(padChar);
        paddedRow.push(padChar);

    }
    let cols = matrix[0].length;
    let padding = new Array(cols).fill(padChar);
    matrix.unshift(padding);
    matrix.push(padding);
    

    return matrix
}
export function convertToNumberMatrix(list: string[]):number[][] {
    let rows = list.length;
    let matrix = new Array(rows);
    for (let k = 0; k < rows; k++) {
        let items = list[k].split('');
        matrix[k] = items.map(item => Number(item));
    }
    return matrix;
}