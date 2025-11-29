"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const banco_1 = require("./banco");
class App {
    banco;
    input = (0, prompt_sync_1.default)();
    constructor() {
        this.banco = new banco_1.Banco();
        this.banco.carregarDados();
    }
    menu() {
        let opcao = '';
        do {
            console.log('\nBem-vindo! Escolha uma opção:');
            console.log('Contas:');
            console.log('01 - Inserir       02 - Consultar  03 - Sacar');
            console.log('04 - Depositar     05 - Excluir  06 - Transferir');
            console.log('07 - Totalizações  08 - Realizar ordem bancária');
            console.log('09 - Transferir Titularidade  10 - Contas sem clientes');
            console.log('11 - Render juros');
            console.log('Clientes:');
            console.log('20 - Inserir    21 - Consultar   22 - Associar ');
            console.log('23 - Total aplicado por cliente  24 - Listar contas');
            console.log('0 - Sair');
            opcao = this.input("Opção: ");
            switch (opcao) {
                case "01":
                    this.inserirConta();
                    break;
                case "02":
                    this.consultarConta();
                    break;
                case "03":
                    this.sacar();
                    break;
                case "04":
                    this.depositar();
                    break;
                case "05":
                    this.excluirConta();
                    break;
                case "06":
                    this.transferir();
                    break;
                case "07":
                    this.totalizacoes();
                    break;
                case "08":
                    this.realizarOrdemBancaria();
                    break;
                case "09":
                    this.transferirTitularidade();
                    break;
                case "10":
                    this.listarContasSemClientes();
                    break;
                case "11":
                    this.renderJuros();
                    break;
                case "20":
                    this.inserirCliente();
                    break;
                case "21":
                    this.consultarCliente();
                    break;
                case "22":
                    this.associarContaCliente();
                    break;
                case "23":
                    this.totalizarSaldoCliente();
                    break;
                case "24":
                    this.listarContasCliente();
                    break;
                case "0":
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida!");
            }
            this.input("Operação finalizada. Pressione <Enter> para continuar.");
        } while (opcao != "0");
        console.log("Aplicação encerrada.");
    }
    inserirConta() {
        console.log("\nCadastrar conta:");
        let numero = this.input('Digite o número da conta: ');
        let saldo = parseFloat(this.input('Digite o saldo inicial da conta: '));
        let tipo = this.input('Digite o tipo da conta: 1 - Conta   2 - Poupança  3 - Conta Imposto');
        let conta;
        if (tipo == '2') {
            conta = new banco_1.Poupanca(numero, saldo, 2);
        }
        else if (tipo = '3') {
            conta = new banco_1.ContaImposto(numero, saldo, 1);
        }
        else {
            conta = new banco_1.Conta(numero, saldo);
        }
        this.banco.inserirConta(conta);
        console.log("Conta cadastrada com sucesso!");
    }
    sacar() {
        console.log("\nSaque:");
        let numero = this.input('Digite o número da conta: ');
        let valor = parseFloat(this.input('Digite o valor do saque: '));
        this.banco.sacar(numero, valor);
        console.log("Saque realizado.");
        this.exibirExtrato(numero);
    }
    depositar() {
        console.log("\nDepósito:");
        let numero = this.input('Digite o número da conta: ');
        let valor = parseFloat(this.input('Digite o valor do depósito: '));
        this.banco.depositar(numero, valor);
        console.log("Depósito realizado.");
        this.exibirExtrato(numero);
    }
    transferir() {
        console.log("\nTransferência:");
        let numeroOrigem = this.input('Digite o número da conta de origem: ');
        let numeroDestino = this.input('Digite o número da conta de destino: ');
        let valor = parseFloat(this.input('Digite o valor da transferência: '));
        this.banco.transferir(numeroOrigem, numeroDestino, valor);
        console.log("Transferência realizada.");
        console.log("\nExtrato da conta de origem:");
        this.exibirExtrato(numeroOrigem);
        console.log("\nExtrato da conta de destino:");
        this.exibirExtrato(numeroDestino);
    }
    renderJuros() {
        console.log("\nRender juros:");
        let numero = this.input('Digite o número da poupança: ');
        this.banco.renderJuros(numero);
        console.log("Operacao realizada realizada.");
        console.log("\nExtrato:");
        this.exibirExtrato(numero);
    }
    consultarConta() {
        console.log("\nConsultar conta:");
        let numero = this.input('Digite o número da conta: ');
        this.exibirExtrato(numero);
    }
    excluirConta() {
        console.log("\nExcluir conta:");
        let numero = this.input('Digite o número da conta: ');
        this.banco.excluir(numero);
        console.log("Conta excluída com sucesso.");
    }
    exibirExtrato(numero) {
        const conta = this.banco.consultarConta(numero);
        if (conta) {
            const cliente = conta.cliente;
            console.log("\n=== Extrato da Conta ===");
            console.log(`ID: ${conta.id}`);
            console.log(`Número da conta: ${conta.numero}`);
            console.log(`Saldo: ${conta.saldo}`);
            if (cliente) {
                console.log("\n=== Dados do Cliente ===");
                console.log(`ID: ${cliente.id}`);
                console.log(`Nome: ${cliente.nome}`);
                console.log(`CPF: ${cliente.cpf}`);
                /*
                console.log("Contas associadas:");
                cliente.contas.forEach((c) =>
                    console.log(`- Conta: ${c.numero}, Saldo: ${c.saldo}`)
                );
                */
            }
            else {
                console.log("Cliente: Não associado.");
            }
            console.log("=========================\n");
        }
        else {
            console.log("Conta não encontrada para exibir extrato.");
        }
    }
    totalizacoes() {
        console.log("\nTotalizações:");
        console.log(`Quantidade de contas: ${this.banco.obterQuantidadeDeContas()}`);
        console.log(`Total depositado no banco: ${this.banco.obterTotalDinheiroDepositado()}`);
        console.log(`Média de saldo das contas: ${this.banco.calcularMediaSaldoContas()}`);
    }
    inserirCliente() {
        console.log("\nCadastrar cliente:");
        let nome = this.input('Digite o nome do cliente: ');
        let cpf = this.input('Digite o CPF do cliente: ');
        let dataNascimento = new Date(this.input('Digite a data de nascimento (AAAA-MM-DD): '));
        let cliente = new banco_1.Cliente(nome, cpf, dataNascimento);
        this.banco.inserirCliente(cliente);
        console.log("Cliente cadastrado com sucesso");
    }
    consultarCliente() {
        console.log("\nConsultar cliente:");
        let cpf = this.input('Digite o CPF do cliente: ');
        let cliente = this.banco.consultarCliente(cpf);
        if (cliente) {
            console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
        }
        else {
            console.log("Cliente não encontrado.");
        }
    }
    associarContaCliente() {
        console.log("\nAssociar conta a cliente:");
        let numeroConta = this.input('Digite o número da conta: ');
        let cpfCliente = this.input('Digite o CPF do cliente: ');
        this.banco.associarContaCliente(numeroConta, cpfCliente);
        console.log("Conta associada ao cliente com sucesso");
    }
    totalizarSaldoCliente() {
        console.log("\Totalizar saldo por cliente:");
        let cpfCliente = this.input('Digite o CPF do cliente: ');
        let total = this.banco.totalizarSaldoCliente(cpfCliente);
        console.log("Total: " + total);
    }
    realizarOrdemBancaria() {
        console.log("\Realizar ordem bancária");
        let numeroConta = this.input('Digite o número da conta de origem: ');
        let valor = Number(this.input('Valor a ser transferido para cada conta: '));
        let numeros = this.input('Digite os números das constas separadas por espaço: ').split(" ");
        this.banco.realizarOrdemBancaria(numeroConta, numeros, valor);
        console.log(numeros);
        console.log("\Conta de origem");
        this.exibirExtrato(numeroConta);
        console.log("\Contas de destino");
        for (let numero of numeros) {
            this.exibirExtrato(numero);
        }
        console.log("Ordem bancária realizada com sucesso.");
    }
    transferirTitularidade() {
        console.log("\Transferir titularidade de conta");
        let numeroConta = this.input('Digite o número da conta: ');
        let cpfCliente = this.input('Digite o CPF do cliente: ');
        this.banco.transferirTitularidade(numeroConta, cpfCliente);
        this.exibirExtrato(numeroConta);
        console.log("Transferência de titularidade realizada com sucesso");
    }
    listarContasSemClientes() {
        console.log("\Listar contas sem clientes");
        let contas = this.banco.listarContasSemCliente();
        for (let conta of contas) {
            this.exibirExtrato(conta.numero);
        }
    }
    listarContasCliente() {
        let cpfCliente = this.input('Digite o CPF do cliente: ');
        let contas = this.banco.listarContasCliente(cpfCliente);
        for (let conta of contas) {
            this.exibirExtrato(conta.numero);
        }
    }
}
let app = new App();
app.menu();
//# sourceMappingURL=app.js.map