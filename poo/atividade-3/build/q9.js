"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nomeAleatorio = (nomes) => {
    if (nomes.length === 0) {
        throw new Error("A lista de nomes está vazia");
    }
    const i = Math.floor(Math.random() * nomes.length);
    return nomes[i];
};
const array = ["ariele", "camila", "madson", "luna", "vitoria", "cláudia"];
console.log(nomeAleatorio(array));
//# sourceMappingURL=q9.js.map