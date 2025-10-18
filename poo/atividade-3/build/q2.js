"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function imprimirSaudacao(nome, saudacao) {
    if (!saudacao)
        saudacao = "Sr/Sra";
    return saudacao + " " + nome;
}
console.log(imprimirSaudacao("ariele", "minha"));
console.log(imprimirSaudacao("ariele"));
//# sourceMappingURL=q2.js.map