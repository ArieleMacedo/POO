"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SituacaoFinaceira {
    valorCreditos = 0;
    valorDebitos = 0;
    calcularSaldo() {
        return this.valorCreditos - this.valorDebitos;
    }
}
let saldo = new SituacaoFinaceira();
saldo.valorCreditos = 400;
saldo.valorDebitos = 1000;
console.log(saldo.calcularSaldo());
//# sourceMappingURL=q9.js.map