"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sorteio {
    nomes = [];
    adicionar(nome) {
        this.nomes.push(nome);
    }
    sortear() {
        return this.nomes[Math.floor(Math.random() * this.nomes.length)];
    }
}
let a1 = new Sorteio();
a1.adicionar("ariele");
a1.adicionar("madson");
a1.adicionar("luna");
console.log(a1.sortear());
//# sourceMappingURL=q11.js.map