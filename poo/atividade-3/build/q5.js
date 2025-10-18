"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exibir(...numeros) {
    let resultado = "";
    numeros.forEach((num, index) => {
        resultado += num;
        if (index < numeros.length - 1) {
            resultado += ",";
        }
    });
    return resultado;
}
console.log(exibir("a", "b"));
console.log(exibir("a", "b", "c"));
console.log(exibir("a", "b", "c", "d"));
//# sourceMappingURL=q5.js.map