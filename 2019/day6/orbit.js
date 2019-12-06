"use strict";
exports.__esModule = true;
var Orbit = /** @class */ (function () {
    function Orbit(name, children) {
        this.name = name;
        this.children = children;
    }
    Orbit.prototype.addChild = function (mapfact) {
        var orb = mapfact.indexOf(')');
        var parent = mapfact.substring(0, orb).trim();
        if (parent === this.name) {
            var c = mapfact.substring(orb + 1).trim();
            this.children.push(c);
        }
    };
    Orbit.prototype.getName = function () {
        return this.name;
    };
    Orbit.prototype.getSubOrbit = function () {
        return this.children;
    };
    return Orbit;
}());
exports.Orbit = Orbit;
