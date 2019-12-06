
export class Orbit{

    private name: string;
    private children: string[]


    constructor(name:string, children: string []){
        this.name = name;
        this.children = children;
    }


    addChild(mapfact){
        let orb = mapfact.indexOf(')');
        let parent = mapfact.substring(0,orb).trim();
        if(parent === this.name){
            let c = mapfact.substring(orb+1).trim();
            this.children.push(c);
        }
    }

    getName(){
        return this.name;
    }

    getSubOrbit(){
        return this.children;
    }
}