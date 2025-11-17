import { Conta } from "./conta.js";
import { Cliente } from "./cliente.js";
import PromptSync from "prompt-sync";
const input = PromptSync();
export class Banco {
    _contas = [];
    _clientes = [];
    constructor() {
        this._contas = [];
        this._clientes = [];
    }
    inserirConta(conta) {
        if (this.consultaPorNumero(conta.numero)) {
            throw new Error("Esse id ou número já pertence a uma conta existente.");
        }
        this._contas.push(conta);
    }
    inserirCliente(cliente) {
        if (this.consultaPorCpf(cliente.cpf)) {
            throw new Error("Esse cliente já está cadastrado.");
        }
        this._clientes.push(cliente);
    }
    consultaPorNumero(numero) {
        const conta = this._contas.find((c) => c.numero === numero);
        if (conta) {
            return conta;
        }
        else {
            throw new Error("Conta não encontrada");
        }
    }
    consultaPorCpf(cpf) {
        const cliente = this._clientes.find((c) => c.cpf === cpf);
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }
        else {
            return cliente;
        }
    }
    depositar(numero, valor) {
        let conta;
        conta = this.consultaPorNumero(numero);
        if (conta) {
            conta.depositar(valor);
        }
    }
    sacar(numero, valor) {
        let conta = this.consultaPorNumero(numero);
        conta.sacar(valor);
    }
    transferir(origemConta, destinoConta, valor) {
        let contaAtual = this.consultaPorNumero(origemConta);
        let contaDestino = this.consultaPorNumero(destinoConta);
        contaAtual.transferir(contaDestino, valor);
    }
    ordemBancaria(contaOrigem, contaDestino, valor) {
        const conta = this.consultaPorNumero(contaOrigem);
        contaDestino.forEach((destino) => {
            const contaDestino = this.consultaPorNumero(destino);
            conta.transferir(contaDestino, valor);
        });
    }
    associarContaCliente(numeroConta, cpfCliente) {
        let Novocliente = this.consultaPorCpf(cpfCliente);
        let conta = this.consultaPorNumero(numeroConta);
        if (conta.cliente === Novocliente) {
            console.log("Essa conta já pertence a esse cliente.");
            return;
        }
        else {
            conta.cliente = Novocliente;
            Novocliente.contas.push(conta);
        }
    }
    listarContasCliente(cpf) {
        let cliente = this.consultaPorCpf(cpf);
        if (cliente.contas.length > 0) {
            console.log(`
        Conta(s) de ${cliente.nome}: `);
            for (const conta of cliente.contas) {
                console.log(`        Conta: ${conta.numero} | Saldo: ${conta.saldo}`);
            }
        }
        else {
            console.log(`${cliente.nome} não possui contas cadastradas.`);
        }
    }
    listarConta(numero) {
        let contaPrint = this.consultaPorNumero(numero);
        console.log(`
        Conta: ${contaPrint.numero} | Saldo: ${contaPrint.saldo}`);
        if (contaPrint.cliente) {
            console.log(`
        Cliente:
        ID: ${contaPrint.cliente.id}
        Nome: ${contaPrint.cliente.nome}
        CPF: ${contaPrint.cliente.cpf}
        Data de Nascimento: ${contaPrint.cliente.dataNascimento.toLocaleDateString("pt-BR")}`);
        }
        else {
            console.log(`A conta número ${contaPrint.numero} não possui cliente associado.`);
        }
    }
    totalizarSaldoCliente(cpf) {
        let cliente = this.consultaPorCpf(cpf);
        const saldoCliente = cliente.contas.reduce((total, conta) => total + conta.saldo, 0);
        return saldoCliente;
    }
    qtdContas() {
        return this._contas.length;
    }
    saldoTotal() {
        return this._contas.reduce((total, c) => total + c.saldo, 0);
    }
    mediaSaldo() {
        if (this.qtdContas() === 0) {
            throw new Error("Erro: Divisão por zero não é permitida.");
        }
        return this.saldoTotal() / this.qtdContas();
    }
    alteraTitularidade(numero, cpf) {
        const contaDesejada = this.consultaPorNumero(numero);
        const novoTitular = this.consultaPorCpf(cpf);
        this.associarContaCliente(contaDesejada.numero, novoTitular.cpf);
    }
    excluirCliente(cpf) {
        const clienteExiste = this.consultaPorCpf(cpf);
        const indice = this._clientes.findIndex((c) => c.cpf === clienteExiste.cpf);
        this._clientes.splice(indice, 1);
        this._contas = this._contas.filter(conta => conta.cliente.cpf !== clienteExiste.cpf);
    }
    excluirConta(numero) {
        const contaExiste = this.consultaPorNumero(numero);
        const indice = this._contas.findIndex((c) => c.numero === contaExiste.numero);
        this._contas.splice(indice, 1);
        contaExiste.cliente.contas = contaExiste.cliente.contas.filter((c) => c.numero !== contaExiste.numero);
    }
    listarContasSemCliente() {
        const contasSemCliente = this._contas.filter((c) => !c.cliente);
        if (contasSemCliente.length === 0) {
            console.log("Não há contas sem cliente.");
        }
        else {
            console.log("Contas sem cliente: ");
            this.listarDados(contasSemCliente);
        }
    }
    listarDados(contas) {
        contas.forEach((c) => {
            console.log(`Número: ${c.numero} | Saldo: ${c.saldo}`);
        });
    }
    listarCliente(cliente) {
        console.log(`
        ID: ${cliente.id}
        Nome: ${cliente.nome}
        CPF: ${cliente.cpf}
        Data de Nascimento: ${cliente.dataNascimento.toLocaleDateString("pt-BR")}`);
        this.listarContasCliente(cliente.cpf);
    }
    carregarDados() {
        let conta1 = new Conta(1, "111-1", new Date(), 300);
        let conta2 = new Conta(2, "222-2", new Date(), 100);
        let conta3 = new Conta(3, "333-3", new Date(), 0);
        let conta4 = new Conta(4, "444-4", new Date(), 50);
        this.inserirConta(conta1);
        this.inserirConta(conta2);
        this.inserirConta(conta3);
        this.inserirConta(conta4);
        let cliente1 = new Cliente(3, "Ariele", '825', new Date(1979, 6, 29));
        let cliente2 = new Cliente(2, "Felipe", '999', new Date(2004, 4, 24));
        this.inserirCliente(cliente1);
        this.inserirCliente(cliente2);
        this.associarContaCliente('111-1', '825');
        this.associarContaCliente('222-2', '999');
        this.associarContaCliente('333-3', '825');
    }
}
//# sourceMappingURL=banco.js.map