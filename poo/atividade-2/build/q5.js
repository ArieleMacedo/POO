"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    nome = "";
    preco = 0;
    aplicarDesconto(percentual) {
        return this.preco - (this.preco * percentual / 100);
    }
    emitirOrcamento(percentual) {
        const precoFormatado = this.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const novoPrecoFormatado = this.aplicarDesconto(percentual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `
        Produto: ${this.nome}, Preço: R$ ${precoFormatado}
        Desconto: ${percentual}% → Novo Preço: ${novoPrecoFormatado}`;
    }
}
let produto = new Produto();
produto.nome = "Camisa";
produto.preco = 100;
console.log(produto.emitirOrcamento(10));
//# sourceMappingURL=q5.js.map