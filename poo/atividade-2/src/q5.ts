class Produto{

    nome: string ="";
    preco: number = 0;

    aplicarDesconto(percentual: number){
        return this.preco - (this.preco * percentual/100) 
    }
    emitirOrcamento(percentual:number){
        const precoFormatado = this.preco.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
        const novoPrecoFormatado= this.aplicarDesconto(percentual).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})

        return `
        Produto: ${this.nome}, Preço: R$ ${precoFormatado}
        Desconto: ${percentual}% → Novo Preço: ${novoPrecoFormatado}`
    }
}
let produto = new Produto();

produto.nome = "Camisa"
produto.preco = 100

console.log(produto.emitirOrcamento(10))

