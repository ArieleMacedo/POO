"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Funcionario {
    _nome;
    _cpf;
    _salario;
    constructor(nome, cpf, salario) {
        this._nome = nome;
        this._cpf = cpf;
        this._salario = salario;
    }
    get nome() {
        return this._nome;
    }
    get cpf() {
        return this._cpf;
    }
    validar() {
        return this._cpf.length == 11;
    }
}
class Gerente extends Funcionario {
    _login;
    _senha;
    constructor(nome, cpf, salario, login, senha) {
        super(nome, cpf, salario);
        this._login = login;
        this._senha = senha;
    }
    autenticar(login, senha) {
        return this._login === login && this._senha === senha;
    }
}
class Diretor extends Gerente {
    _bonus;
    constructor(nome, cpf, salario, login, senha, bonus) {
        super(nome, cpf, salario, login, senha);
        this._bonus = bonus;
    }
}
let funcionario = new Funcionario("ariele", "123", 1000);
let gerente = new Gerente('pedro', '666', 2000, 'pedro.silva', '1234');
let diretor = new Diretor('joao', '999', 3000, 'joao.sousa', '321', 1000);
console.log(diretor.nome);
console.log(diretor.validar());
//# sourceMappingURL=heranca.js.map