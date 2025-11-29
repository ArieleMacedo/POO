"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.Cliente = exports.Conta = exports.ContaImposto = exports.Poupanca = void 0;
class Conta {
    _id;
    _numero;
    _saldo;
    _cliente;
    _dataDeAbertura;
    constructor(numero, saldo) {
        this._id = 0;
        this._numero = numero;
        this._saldo = saldo;
        this._dataDeAbertura = new Date();
    }
    sacar(valor) {
        this._saldo = this._saldo - valor;
    }
    depositar(valor) {
        this._saldo = this._saldo + valor;
    }
    get saldo() {
        return this._saldo;
    }
    transferir(contaDestino, valor) {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;
        this.sacar(valor);
        contaDestino.depositar(valor);
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
}
exports.Conta = Conta;
class Cliente {
    _id;
    _nome;
    _cpf;
    _dataNascimento;
    _contas;
    constructor(nome, cpf, dataNascimento) {
        this._id = 0;
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
}
exports.Cliente = Cliente;
class Banco {
    _contas;
    _clientes;
    _idClienteAtual;
    _idContaAtual;
    constructor() {
        this._contas = [];
        this._clientes = [];
        this._idClienteAtual = 1;
        this._idContaAtual = 1;
    }
    inserirConta(conta) {
        conta.id = this._idContaAtual++;
        if (!this.consultarConta(conta.numero)) {
            this._contas.push(conta);
        }
    }
    consultarConta(numero) {
        let contaProcurada;
        for (let conta of this._contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }
    consultarContaPorIndice(numero) {
        let indiceProcurado = -1;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    }
    excluir(numero) {
        let indiceProcurado = this.consultarContaPorIndice(numero);
        if (indiceProcurado != -1) {
            if (this.consultarConta("numero").cliente) {
                return;
            }
            for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }
    alterar(conta) {
        let contaProcurada = this.consultarConta(conta.numero);
        if (contaProcurada) {
            contaProcurada = conta;
        }
    }
    inserirCliente(cliente) {
        cliente.id = this._idClienteAtual++;
        if (!this.consultarCliente(cliente.cpf)) {
            this._clientes.push(cliente);
        }
    }
    consultarCliente(cpf) {
        let clienteProcurado;
        for (let cliente of this._clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    }
    excluirCliente(cpf) {
        let indice = this._clientes.findIndex((c) => c.cpf == cpf);
        if (indice >= 0 && this._clientes[indice].contas.length == 0) {
            this._clientes.splice(indice, 1);
        }
    }
    sacar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }
    depositar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        let contaOrigem = this.consultarConta(numeroOrigem);
        let contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }
    associarContaCliente(numeroConta, cpfCliente) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfCliente);
        if (contaProcurada &&
            clienteProcurado &&
            !this.jaExisteContaParaCliente(clienteProcurado.cpf, contaProcurada.numero)) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.contas.push(contaProcurada);
        }
    }
    jaExisteContaParaCliente(cpf, numero) {
        let contaProcurada = this.consultarConta(numero);
        let clienteProcurado = this.consultarCliente(cpf);
        if (!contaProcurada && !clienteProcurado) {
            return false;
        }
        if (contaProcurada.cliente == null) {
            return false;
        }
        if (contaProcurada.cliente.cpf == clienteProcurado.cpf) {
            return true;
        }
        for (let contaAssociada of clienteProcurado.contas) {
            if (contaAssociada.numero == contaProcurada.numero) {
                return true;
                break;
            }
        }
        /*
            let conta2 = this.pesquisarContaPorCPF(clienteProcurado.cpf)
            if (conta2) {
                if (conta2.numero = contaProcurada.numero) {
                    return true;
                }
            }*/
        return false;
    }
    pesquisarContaPorCPF(cpf) {
        let contaProcurada;
        for (let conta of this._contas) {
            if (conta.cliente && conta.cliente.cpf == cpf) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }
    listarContasSemCliente() {
        let contas = [];
        for (let conta of this._contas) {
            if (!conta.cliente) {
                contas.push(conta);
            }
        }
        return contas;
    }
    listarContasCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let contas = [];
        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }
    totalizarSaldoCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let total = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo;
            }
        }
        return total;
    }
    obterQuantidadeDeContas() {
        return this._contas.length;
    }
    obterTotalDinheiroDepositado() {
        let total = 0;
        for (let conta of this._contas) {
            total = total + conta.saldo;
        }
        return total;
    }
    calcularMediaSaldoContas() {
        return this.obterTotalDinheiroDepositado() / this.obterQuantidadeDeContas();
    }
    realizarOrdemBancaria(numeroContaOrigem, numerosContasDestino, valor) {
        let contaOrigem = this.consultarConta(numeroContaOrigem);
        //TODO: validar se o saldo suporta as n transferências
        if (!contaOrigem) {
            return;
        }
        for (let numeroDestino of numerosContasDestino) {
            let contaDestino = this.consultarConta(numeroDestino);
            if (contaDestino) {
                contaOrigem.sacar(valor);
                contaDestino.depositar(valor);
            }
        }
    }
    transferirTitularidade(numeroConta, cpf) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpf);
        if (!contaProcurada && !clienteProcurado) {
            return;
        }
        if (this.jaExisteContaParaCliente(clienteProcurado.cpf, contaProcurada.numero)) {
            return;
        }
        this.associarContaCliente(contaProcurada.numero, clienteProcurado.cpf);
    }
    carregarDados() {
        let conta1 = new Conta("111-1", 300);
        let conta2 = new Conta("222-2", 0);
        let conta3 = new Conta("333-3", 0);
        let conta4 = new Conta("444-4", 0);
        this.inserirConta(conta1);
        this.inserirConta(conta2);
        this.inserirConta(conta3);
        this.inserirConta(conta4);
        let cliente1 = new Cliente("Ely", "825", new Date(1979, 6, 29));
        let cliente2 = new Cliente("Nicolas", "999", new Date(2004, 4, 24));
        this.inserirCliente(cliente1);
        this.inserirCliente(cliente2);
        this.associarContaCliente("111-1", "825");
        this.associarContaCliente("222-2", "999");
        this.associarContaCliente("333-3", "825");
    }
    renderJuros(numero) {
        let contaProcurada = banco.consultarConta(numero);
        if (contaProcurada) {
            if (contaProcurada instanceof Poupanca) {
                contaProcurada.renderJuros();
            }
        }
        else {
            //mais tarde fazer um thwrow error
            console.log("Falhou");
            return;
        }
    }
}
exports.Banco = Banco;
class Poupanca extends Conta {
    _taxaJuros;
    constructor(numero, saldo, taxaJuros) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    }
    renderJuros() {
        let juros = (this.saldo * this._taxaJuros) / 100;
        this.depositar(juros);
    }
}
exports.Poupanca = Poupanca;
class ContaImposto extends Conta {
    _taxaDesconto;
    constructor(numero, saldo, taxaDesconto) {
        super(numero, saldo);
        this._taxaDesconto = taxaDesconto;
    }
    sacar(valor) {
        let desconto = (this.saldo * this._taxaDesconto) / 100;
        let total = valor + desconto;
        super.sacar(total);
    }
}
exports.ContaImposto = ContaImposto;
let conta1 = new Conta("111", 100);
let poupanca1 = new Poupanca("222", 100, 3);
let banco = new Banco();
banco.inserirConta(conta1);
banco.inserirConta(poupanca1);
banco.transferir("111", "222", 10);
let contaimposto = new ContaImposto("123", 100, 0.38);
banco.inserirConta(contaimposto);
banco.sacar("123", 50);
console.log(banco.consultarConta('123'));
//# sourceMappingURL=banco.js.map