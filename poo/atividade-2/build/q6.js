"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Numero {
    valor = 0;
    ehPar() {
        if (this.valor % 2 === 0) {
            return "Verdadeiro";
        }
        else {
            return "Falso";
        }
    }
    ehImpar() {
        if (this.valor % 2 != 0) {
            return "Verdadeiro";
        }
        else {
            return "Falso";
        }
    }
}
let numero = new Numero();
numero.valor = 7;
console.log(numero.ehPar());
console.log(numero.ehImpar());
//# sourceMappingURL=q6.js.map