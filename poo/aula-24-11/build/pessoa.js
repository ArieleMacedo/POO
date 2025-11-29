"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pessoa {
    _nome;
    _sobrenome;
    constructor(nome, sobrenome) {
        this._nome = nome;
        this._sobrenome = sobrenome;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
    get nomeCompleto() {
        return `${this.nome}` + " " + `${this.sobrenome}`;
    }
}
class Funcionario extends Pessoa {
    _matricula;
    _salario;
    constructor(nome, sobrenome, maricula, salario) {
        super(nome, sobrenome);
        this._matricula = maricula;
        if (salario <= 0) {
            throw new Error("O salario nao pode ser nagativo.");
        }
        this._salario = salario;
    }
    get matricula() {
        return this._matricula;
    }
    get salario() {
        return this._salario;
    }
    set salario(valor) {
        if (valor <= 0) {
            throw new Error("O salario nao pode ser nagativo.");
        }
        this._salario = valor;
    }
    calcularSalarioPrimeiraParcela() {
        return this.salario * 0.6;
    }
    calcularSalarioSegundaParcela() {
        return this.salario * 0.4;
    }
}
class Professor extends Funcionario {
    _titulacao;
    constructor(nome, sobrenome, maricula, salario, titulacao) {
        super(nome, sobrenome, maricula, salario);
        this._titulacao = titulacao;
    }
    get titulacao() {
        return this._titulacao;
    }
    calcularSalarioPrimeiraParcela() {
        return this.salario;
    }
    calcularSalarioSegundaParcela() {
        return 0;
    }
}
class FolhaDePagamento {
    _pessoa;
    constructor() {
        this._pessoa = [];
    }
    adicionarPessoa(p) {
        this._pessoa.push(p);
    }
    calcularPagamentos() {
        let total = 0;
        for (let pessoa of this._pessoa) {
            if (pessoa instanceof Funcionario) {
                total += pessoa.salario;
            }
        }
        return total;
    }
}
console.log("=== TESTES ===");
console.log("\n--- Testando Pessoa ---");
const p = new Pessoa("Ariele", "Macedo");
console.log("Nome:", p.nome);
console.log("Sobrenome:", p.sobrenome);
console.log("Nome completo:", p.nomeCompleto);
console.log("\n--- Testando Funcionario ---");
const f = new Funcionario("Felipe", "Madson", "012", 1000);
console.log("Matricula:", f.matricula);
console.log("Salario:", f.salario);
console.log("1ª parcela:", f.calcularSalarioPrimeiraParcela());
console.log("2ª parcela:", f.calcularSalarioSegundaParcela());
f.salario = 2000;
console.log("Novo salário:", f.salario);
try {
    f.salario = 0;
}
catch (err) {
    console.log("Erro ao tentar definir salário 0:", err.message);
}
console.log("\n--- Testando Professor ---");
const prof = new Professor("Ely", "Miranda", "222", 3000, "Mestre");
console.log("Nome:", prof.nome);
console.log("Titulacao:", prof.titulacao);
console.log("Salario:", prof.salario);
console.log("1ª parcela professor:", prof.calcularSalarioPrimeiraParcela());
console.log("2ª parcela professor:", prof.calcularSalarioSegundaParcela());
console.log("\n--- Testando Folha de Pagamento ---");
const f1 = new Funcionario("Ana", "Silva", "111", 2000);
const p1 = new Professor("Carlos", "Souza", "444", 4000, "Doutor");
const p2 = new Pessoa("Maria", "Oliveira");
const folha = new FolhaDePagamento();
folha.adicionarPessoa(f1);
folha.adicionarPessoa(p1);
folha.adicionarPessoa(p2);
console.log("Total dos pagamentos:", folha.calcularPagamentos());
//# sourceMappingURL=pessoa.js.map