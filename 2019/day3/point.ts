export class Point {
    private x: number;
    private y: number;
    private length: number;

    constructor(x: number, y: number, plen: number) {
        this.x = x;
        this.y = y;
        this.length = plen;
    }

    equals(other: Point) {
        return ((this.x === other.x) && (this.y === other.y));
    }
    add(vector: Point) {
        let nextx = this.x + vector.x;
        let nexty = this.y + vector.y;
        let nextlen = this.length + vector.length;
        return new Point(nextx, nexty, nextlen);
    }
    copy() {
        let x = this.x;
        let y = this.y;
        let plen = this.length;
        return new Point(x, y, plen);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getLength() {
        return this.length;
    }

}