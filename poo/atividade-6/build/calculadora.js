"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculadora {
    _operando1;
    _operando2;
    constructor(op1, op2) {
        this._operando1 = op1;
        this._operando2 = op2;
    }
    get op1() {
        return this._operando1;
    }
    get op2() {
        return this._operando2;
    }
    set op1(op) {
        this._operando1 = op;
    }
    set op2(op) {
        this._operando2 = op;
    }
    soma() {
        return this.op1 + this.op2;
    }
    multiplicacao() {
        return this.op1 * this.op2;
    }
}
let calculadora = new Calculadora(2, 3);
calculadora.op1 = 4;
console.log(calculadora.op1);
console.log(calculadora.soma());
console.log(calculadora.multiplicacao());
//# sourceMappingURL=calculadora.js.map