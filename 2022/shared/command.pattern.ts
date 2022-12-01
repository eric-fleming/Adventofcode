let state = {
    depth: 0,
    horizontal:0
}

let commands = {
    "down": (val: number) => {state.depth += val},
    "up": (val: number) => {state.depth -= val},
    "forward": (val: number) => {state.horizontal += val}
}


export class CommandPattern {
    
}