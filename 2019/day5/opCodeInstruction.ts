export class OpCodeInstruction{
    action: number;
    jump: number;
    p1: number;
    p2?: number;
    p3?: number;
    

    constructor(code:number){
        // code ABCDE
        this.action = code % 100; // extracts DE: 1, 2, 3, 4, 5, 6, 7, 8, or 99
        let params = (code - this.action) / 100; // extracts ABC: clears the bottom two digits
        
        // set the param modes for the next inputs
        if(this.action !== 99){
            // everyone else has a p1
            this.p1 = params % 10;
            if (this.action === 3 || this.action === 4) {
                this.jump = 2;
            }
            else if (this.action === 5 || this.action === 6) {
                // p1 and p2
                this.p2 = Math.floor((params % 100) / 10);
                this.jump = 3;
            }
            else if (this.action === 1 || this.action === 2 || this.action === 7 || this.action === 8) {
                // p1, p2, & p3
                this.p2 = Math.floor((params % 100) / 10);
                this.p3 = Math.floor(params / 100);
                this.jump = 4;
            }
            else {
                console.log(`Invalid opcode : ${this.action}\n Definition is not in API.\nCould not construct Instruction Object.`);
            }
        }
        
    }


}


function test(){
    let i0005 = new OpCodeInstruction(5);
    console.table(i0005);
    let i003 = new OpCodeInstruction(3);
    console.table(i003);
    let i104 = new OpCodeInstruction(4);
    console.table(i104);
    let i105 = new OpCodeInstruction(105);
    console.table(i105);
    let i1102 = new OpCodeInstruction(1102);
    console.table(i1102);
    let i0001 = new OpCodeInstruction(1);
    console.table(i0001);
    let i1001 = new OpCodeInstruction(1001);
    console.table(i1001);
    let i1008 = new OpCodeInstruction(1008);
    console.table(i1008);
    let i1107 = new OpCodeInstruction(1107);
    console.table(i1107);
}

// test();