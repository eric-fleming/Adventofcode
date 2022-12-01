

export function average(list:number[]){
    let len = list.length;
    let sum = list.reduce((a,b)=>a+b);
    return sum/len;
}


export function pythagorean(x:number, y:number){
    return Math.sqrt(x*x +y*y);
}

