"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function traco(numeros) {
    let resultado = "";
    numeros.forEach((num, index) => {
        resultado += num;
        if (index < numeros.length - 1) {
            resultado += "-";
        }
    });
    return resultado;
}
const lista = [1, 3, 4, 5, 4, 2, 1, 1];
console.log(traco(lista));
//# sourceMappingURL=q3.js.map