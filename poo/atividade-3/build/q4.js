"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function soma(x, y) {
    return x + y;
}
//a) Somou normalmente os números. Resultado: 3
console.log(soma(1, 2));
//b) Concatenou o numero(que foi implicitamente convertido para string) e a string. Resultado: 12
console.log(soma(1, "2"));
//c) A conversão de undefined para number sempre resulta em NaN (Not a Number). Qualquer operação matemática envolvendo NaN resulta em NaN.. Resultado: NaN
console.log(soma(1));
//# sourceMappingURL=q4.js.map