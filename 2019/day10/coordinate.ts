export class Coordinate{

    readonly x: number;
    readonly y: number;

    constructor(a:number, b:number){
        this.x = a;
        this.y = b;
    }

    relativeCoordinate(center: Coordinate){
        let rx = this.x - center.x;
        let ry = this.y - center.y;
        return new Coordinate(rx,ry);
    }
    
    toString(){
        return `(${this.x},${this.y})`;
    }
}