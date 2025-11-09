class Triangulo{
    l1 : number;
    l2 : number;
    l3 : number;
    
    constructor(l1:number, l2:number,l3:number){
        this.l1 = l1;
        this.l2 = l2;
        this.l3 =l3;
    }
    ehTriangulo():boolean{
       const cA = (this.l1 > Math.abs(this.l2 - this.l3)) && (this.l1 < this.l2 + this.l3)
       const cB = (this.l2 > Math.abs(this.l1 - this.l3)) && (this.l2< this.l1 + this.l3)
       const cC = (this.l3 > Math.abs(this.l1 - this.l2)) && (this.l3 < this.l1 + this.l2)
       
       return cA && cB && cC;
    }
    ehEquilatero():boolean{
        return this.ehTriangulo() && this.l1 == this.l2 && this.l2 == this.l3
    }
    ehEscaleno(): boolean{
        return this.ehTriangulo() && this.l1 != this.l2 && this.l2 != this.l3
    }
    ehIsoceles(): boolean{
        return this.ehTriangulo() && !this.ehEquilatero() && !this.ehEscaleno()
    }
}

let t1: Triangulo = new Triangulo (2,3,3)
let t2: Triangulo = new Triangulo(2, 2, 3);

console.log("t1 é triângulo? " + t1.ehTriangulo());
console.log("t1 é isóceles? " + t1.ehIsoceles());
console.log("t2 é isóceles? " + t2.ehIsoceles());
console.log("t2 é equilátero? " + t2.ehEquilatero());