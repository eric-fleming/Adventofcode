/* Modules */
const fs = require('fs');


/* Global Variables */
const network = fs.readFileSync("day9info.txt", "utf8");
const routeStrings = network.split("\n");
let routesTable = parseRoutes(routeStrings);
const locations = ["Tristram", "AlphaCentauri", "Snowdin", "Tambi", "Faerun", "Norrath", "Straylight", "Arbre"];

function Route(a,b,d){
    this.cityA = a;
    this.cityB = b;
    this.dist = d;
}

function parseRoute(route) {
    let eq = route.indexOf('=');
    let cities = route.substring(0,eq).trim();
    let distance = Number(route.substring(eq + 1).trim());

    let to = cities.indexOf('to');
    let cityA = cities.substring(0,to).trim();
    let cityB = cities.substring(to+3).trim();
    const c = new Route(cityA,cityB,distance);
    return c;
}

function parseRoutes(routesStrArray){
    let routeObjArray = [];
    for(let i = 0; i < routesStrArray.length; i++){
        let r = parseRoute(routeStrings[i])
        routeObjArray.push(r);
    }
    return routeObjArray
}

function sortedByDistance(table){
    return table.sort((a,b) => a.dist - b.dist);
}


function scheduleRoute(table,cityArray){
    // assumes the table is sorted from min to max
    let numOfCities = cityArray.length;
    let count = 0;
    const maxCount = numOfCities-1;
    const firstCount = Math.ceil(maxCount);
    const secondCount = Math.floor(maxCount);

    let journey = 0;
    let visited = new Array(numOfCities);
    visited.fill(0);
    let route = []
    let usedRoutes = []
    for(let c = 0; c < table.length; c++){

        let aIndex = locations.indexOf(table[c].cityA);
        let bIndex = locations.indexOf(table[c].cityB);
        let dist = table[c].dist;
        
        if (visited[aIndex] < 1 && visited[bIndex] < 1){
            visited[aIndex]++;
            visited[bIndex]++;
            journey += dist
            count++;
            route.push(table[c]);
            usedRoutes.push(c);
        }
        if (count === firstCount) {
            // reset count for second pass
            count = 0;
            break;
        }

    }

    for (let c = 0; c < table.length; c++) {

        let aIndex = locations.indexOf(table[c].cityA);
        let bIndex = locations.indexOf(table[c].cityB);
        let dist = table[c].dist;

        if (visited[aIndex] < 2 && visited[bIndex] < 2 && !usedRoutes.includes(c)) {
            visited[aIndex]++;
            visited[bIndex]++;
            journey += dist
            count++;
            route.push(table[c]);
            usedRoutes.push(c);
        }
        if (count === secondCount) {
            break;
        }

    }

    console.table(route);
    console.table(visited);
    return journey;
}



function c1(){
    let rs = parseRoutes(routeStrings);
    sorted_rs = sortedByDistance(rs);
    //console.table(sorted_rs);
    let minTrip = scheduleRoute(sorted_rs,locations);
    console.log(`The minimum distance is ${minTrip}`);
}

//c1();

function c2(){
    let rs = parseRoutes(routeStrings);
    sorted_rs = sortedByDistance(rs);
    sorted_rs = sorted_rs.reverse();
    console.table(sorted_rs);
    let maxTrip = scheduleRoute(sorted_rs, locations);
    console.log(`The maximum distance is ${maxTrip}`);
}
c2();