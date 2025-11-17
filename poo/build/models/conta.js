export class Conta {
    _id;
    _numero;
    _cliente;
    _dataAbertura;
    _saldo;
    constructor(id, numero, dataAbertura, saldoInicial) {
        this._id = id;
        this._numero = numero;
        this._dataAbertura = dataAbertura;
        this._saldo = saldoInicial;
    }
    get id() {
        return this._id;
    }
    get saldo() {
        return this._saldo;
    }
    get numero() {
        return this._numero;
    }
    set id(umId) {
        this._id = umId;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(umCliente) {
        if (umCliente) {
            this._cliente = umCliente;
        }
    }
    depositar(valor) {
        this._saldo = this.saldo + valor;
    }
    sacar(valor) {
        if (this.validarSaldo(this.saldo, valor)) {
            this._saldo = this.saldo - valor;
        }
        else {
            console.log("Saldo Insuficiente");
        }
    }
    transferir(contaDestino, valor) {
        if (this.validarSaldo(this.saldo, valor)) {
            this.sacar(valor);
            contaDestino.depositar(valor);
        }
        else {
            console.log("Transfêrencia Não Realizada. Saldo Insuficiente");
        }
    }
    consultarSaldo() {
        return this.saldo;
    }
    validarSaldo(saldo, valor) {
        return saldo >= valor;
    }
}
//# sourceMappingURL=conta.js.map