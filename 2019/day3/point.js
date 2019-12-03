"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(x, y, plen) {
        this.x = x;
        this.y = y;
        this.length = plen;
    }
    Point.prototype.equals = function (other) {
        return ((this.x === other.x) && (this.y === other.y));
    };
    Point.prototype.add = function (vector) {
        var nextx = this.x + vector.x;
        var nexty = this.y + vector.y;
        var nextlen = this.length + vector.length;
        return new Point(nextx, nexty, nextlen);
    };
    Point.prototype.copy = function () {
        var x = this.x;
        var y = this.y;
        var plen = this.length;
        return new Point(x, y, plen);
    };
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    Point.prototype.getLength = function () {
        return this.length;
    };
    return Point;
}());
exports.Point = Point;
