"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pessoa {
    nome = "";
    idade = 0;
    apresentar() {
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos`;
    }
}
let pessoa = new Pessoa();
pessoa.nome = "Ely";
pessoa.idade = 46;
console.log(pessoa.apresentar());
let pessoa2 = new Pessoa();
pessoa2.nome = "Ariele";
pessoa2.idade = 19;
console.log(pessoa2.apresentar());
//# sourceMappingURL=q4.js.map