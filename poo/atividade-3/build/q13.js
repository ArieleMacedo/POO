"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TradutorEmojis {
    dicionario = {
        amor: "❤️ ",
        futebol: "⚽ ",
        cachorro: "🐶 ",
        gato: "🐈 ",
    };
    traduzir(frase) {
        let palavras = frase.split(" ");
        let traduzir = palavras.map((item) => {
            if (this.dicionario[item]) {
                item = this.dicionario[item];
            }
            return item;
        });
        let resultado = traduzir.join(" ");
        return resultado;
    }
}
let tradutor = new TradutorEmojis();
console.log(tradutor.traduzir("O amor da minha vida é um gato !"));
//# sourceMappingURL=q13.js.map