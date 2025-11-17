export class Cliente {
    _id;
    _nome;
    _cpf;
    _dataNascimento;
    _contas = [];
    constructor(id, nome, cpf, dataNascimento) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }
    set id(umId) {
        this._id = umId;
    }
    get cpf() {
        return this._cpf;
    }
    get nome() {
        return this._nome;
    }
    get contas() {
        return this._contas;
    }
    set contas(umaConta) {
        if (umaConta) {
            this._contas = umaConta;
        }
    }
    get dataNascimento() {
        return this._dataNascimento;
    }
}
//# sourceMappingURL=cliente.js.map