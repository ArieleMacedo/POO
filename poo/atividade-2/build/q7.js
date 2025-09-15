"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function teste() {
    let x = 10;
    console.log("Início do programa");
    if (x > 5) {
        console.log("x é maior que 5");
        // Tudo abaixo desse return nunca será executado
        return;
        console.log("Essa linha é inatingível!");
    }
    console.log("Fim do programa");
}
teste();
//# sourceMappingURL=q7.js.map