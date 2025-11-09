"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangulo {
    l1;
    l2;
    l3;
    constructor(l1, l2, l3) {
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
    }
    ehTriangulo() {
        const cA = (this.l1 > Math.abs(this.l2 - this.l3)) && (this.l1 < this.l2 + this.l3);
        const cB = (this.l2 > Math.abs(this.l1 - this.l3)) && (this.l2 < this.l1 + this.l3);
        const cC = (this.l3 > Math.abs(this.l1 - this.l2)) && (this.l3 < this.l1 + this.l2);
        return cA && cB && cC;
    }
    ehEquilatero() {
        return this.ehTriangulo() && this.l1 == this.l2 && this.l2 == this.l3;
    }
    ehEscaleno() {
        return this.ehTriangulo() && this.l1 != this.l2 && this.l2 != this.l3;
    }
    ehIsoceles() {
        return this.ehTriangulo() && !this.ehEquilatero() && !this.ehEscaleno();
    }
}
let t1 = new Triangulo(2, 3, 3);
let t2 = new Triangulo(2, 2, 3);
console.log("t1 é triângulo? " + t1.ehTriangulo());
console.log("t1 é isóceles? " + t1.ehIsoceles());
console.log("t2 é isóceles? " + t2.ehIsoceles());
console.log("t2 é equilátero? " + t2.ehEquilatero());
//# sourceMappingURL=q6.js.map