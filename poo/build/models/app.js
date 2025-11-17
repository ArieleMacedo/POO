import { Cliente } from "./cliente.js";
import { Conta } from "./conta.js";
import { Banco } from "./banco.js";
import { Validacoes } from "./validacoes.js";
import { limparTela, limparTelaEnter } from "./utils.js";
let validacao = new Validacoes();
import PromptSync from "prompt-sync";
const input = PromptSync();
let banco = new Banco();
banco.carregarDados();
class App {
    menu() {
        limparTela();
        let opcao;
        do {
            console.log(`
        -------------------
         Banco do Nordeste
        -------------------
        1- Contas
        2- Clientes
        3- Sair\n`);
            opcao = validacao.numIntMinMax("Digite uma opcão:", 1, 4);
            switch (opcao) {
                case 1:
                    this.menuContas();
                    break;
                case 2:
                    this.menuCliente();
                    break;
                case 3:
                    limparTela();
                    console.log("Agradecemos a preferência, até breve.");
                    break;
            }
        } while (opcao !== 3);
    }
    menuContas() {
        let opcao;
        do {
            limparTela();
            console.log(`
        ------------------
          Menu Conta 
        ------------------
        1- Inserir
        2- Consultar
        3- Sacar
        4- Depositar
        5- Transferir
        6- Ordem Bancária
        7- Tranferir Titularidade
        8- Listar Contas Sem Ciente
        9- Totalilzaçoes
        10- Excluir
        11- Voltar\n`);
            opcao = validacao.numIntMinMax("Digite uma opcão: ", 1, 11);
            limparTela();
            switch (opcao) {
                case 1:
                    this.cadastrarConta();
                    break;
                case 2:
                    this.consultarConta();
                    break;
                case 3:
                    this.sacarDaConta();
                    break;
                case 4:
                    this.depositarNaConta();
                    break;
                case 5:
                    this.transferir();
                    break;
                case 6:
                    this.ordemBancaria();
                    break;
                case 7:
                    this.transferirTitularidade();
                    break;
                case 8:
                    this.listarContasSemCliente();
                    break;
                case 9:
                    this.totalDoBanco();
                    break;
                case 10:
                    this.excluirConta();
                    break;
                case 11:
                    this.menu();
                    break;
            }
        } while (opcao !== 11);
    }
    menuCliente() {
        let opcao;
        do {
            limparTela();
            console.log(`
        ------------------
          Menu Cliente 
        ------------------
        1- Inserir
        2- Consultar
        3- Associar
        4- Saldo Total
        5- Listar Contas
        6- Voltar\n`);
            opcao = validacao.numIntMinMax("Opção: ", 1, 6);
            limparTela();
            switch (opcao) {
                case 1:
                    this.cadastrarCliente();
                    break;
                case 2:
                    this.consultarCliente();
                    break;
                case 3:
                    this.associarCliente();
                    break;
                case 4:
                    this.saldoTotalCliente();
                    break;
                case 5:
                    this.listarContasDoCliente();
                    break;
                case 6:
                    this.menu();
                    break;
            }
        } while (opcao !== 6);
    }
    cadastrarConta() {
        validacao.tentativa(() => {
            console.log(`--Inserir Conta--\n`);
            let id = validacao.numeroInteiro("ID: ");
            let numero = validacao.validarTexto("Número da conta: ");
            let dataAbertura = new Date();
            let saldo = 0;
            const conta = new Conta(id, numero, dataAbertura, saldo);
            banco.inserirConta(conta);
            limparTela();
            console.log("Conta Inserida.");
            limparTelaEnter();
        }, "Inserir conta", () => this.cadastrarConta());
    }
    consultarConta() {
        validacao.tentativa(() => {
            console.log(`--Consultar conta pelo número--\n`);
            let numero = validacao.validarTexto("Número da conta: ");
            let contaProcurada;
            limparTela();
            contaProcurada = banco.consultaPorNumero(numero);
            banco.listarConta(contaProcurada.numero);
            limparTelaEnter();
        }, "Consultar conta", () => this.consultarConta());
    }
    sacarDaConta() {
        validacao.tentativa(() => {
            console.log(`--Sacar--\n`);
            let numero = validacao.validarTexto("Número: ");
            let valor = validacao.numFloatPositivo("Valor: ");
            let conta = banco.consultaPorNumero(numero);
            limparTela();
            banco.sacar(numero, valor);
            console.log(`Saldo da Conta ${conta.numero}: R$ `, conta.saldo.toFixed(2));
        }, "Sacar", () => this.sacarDaConta());
    }
    depositarNaConta() {
        validacao.tentativa(() => {
            console.log(`--Depositar--\n`);
            let numero = validacao.validarTexto("Número: ");
            let valor = validacao.numFloatPositivo("Valor: ");
            let conta = banco.consultaPorNumero(numero);
            limparTela();
            banco.depositar(numero, valor);
            console.log("Depósito realizado com sucesso.");
            console.log(`
          Saldo da Conta ${conta.numero}: R$ `, conta.saldo.toFixed(2));
            limparTelaEnter();
        }, "Depositar", () => this.depositarNaConta());
    }
    transferir() {
        validacao.tentativa(() => {
            let numero = validacao.validarTexto("Número da conta origem: ");
            let valor = validacao.numFloatPositivo("Valor: ");
            let contaDestino = validacao.validarTexto("Número da conta destino: ");
            let contaOrigem = banco.consultaPorNumero(numero);
            limparTela();
            banco.transferir(contaOrigem.numero, contaDestino, valor);
            console.log(`Conta de origem: ${contaOrigem.numero} | Novo saldo: ${contaOrigem.saldo}`);
            console.log(`\nExtrato da Conta Destino: `);
            banco.listarConta(contaDestino);
            limparTelaEnter();
        }, "Depositar", () => this.transferir());
    }
    ordemBancaria() {
        validacao.tentativa(() => {
            console.log("--Ordem Bancaria--");
            let numero = validacao.validarTexto("Número da conta origem: ");
            let contaOrigem = banco.consultaPorNumero(numero);
            let valor = validacao.numFloatPositivo("Valor: ");
            let contasDestino = validacao.validarTexto("Contas destino separa por traço (-): ").split("-");
            banco.ordemBancaria(contaOrigem.numero, contasDestino, valor);
            limparTela();
            console.log(`Ordem bancaria realizada.\n`);
            console.log(`Conta de origem: ${contaOrigem.numero} | Novo saldo: ${contaOrigem.saldo}`);
            console.log(`\nExtrato das Contas Destino: `);
            for (let conta of contasDestino) {
                banco.listarConta(conta);
            }
            limparTelaEnter();
        }, "Realizar ordem bancaria", () => this.ordemBancaria());
    }
    transferirTitularidade() {
        validacao.tentativa(() => {
            console.log("--Tranferir Titularidade--");
            let numero = validacao.validarTexto("Número: ");
            let conta = banco.consultaPorNumero(numero);
            let cpf = validacao.validarTexto("CPF: ");
            let cliente = banco.consultaPorCpf(cpf);
            limparTela();
            console.log("Tranferencia de titularidade realizada.");
            console.log(`       Antigo titular da conta: ${conta.cliente.nome}`);
            banco.alteraTitularidade(conta.numero, cpf);
            console.log(`       Novo titular: ${conta.cliente.nome}`);
            limparTelaEnter();
        }, "Alterar titularidade", () => this.transferirTitularidade());
    }
    listarContasSemCliente() {
        banco.listarContasSemCliente();
        limparTelaEnter();
        let associar = validacao.numIntMinMax("Deseja atribuir uma titularidade a conta?: (1- Sim | 2- Não): ", 1, 2);
        if (associar === 1) {
            this.associarCliente();
        }
        else {
            return;
        }
    }
    totalDoBanco() {
        let saldo = banco.saldoTotal();
        console.log(`Saldo total do Banco: R$ ${saldo.toFixed(2)}`);
        limparTelaEnter();
        return;
    }
    excluirConta() {
        validacao.tentativa(() => {
            console.log(`--Excluir conta--\n`);
            let numero = validacao.validarTexto("Número: ");
            let conta = banco.consultaPorNumero(numero);
            banco.excluirConta(conta.numero);
            limparTela();
            console.log("Conta excluida.");
            limparTelaEnter();
        }, "Excluir conta", () => this.excluirConta());
    }
    cadastrarCliente() {
        validacao.tentativa(() => {
            console.log(`--Inserir Cliente--\n`);
            let id = validacao.numeroInteiro("ID: ");
            let nome = validacao.validarTexto("Nome: ");
            let cpf = validacao.validarTexto("CPF: ");
            let dataDeNascimento = validacao.lerDataNascimento();
            const cliente = new Cliente(id, nome, cpf, dataDeNascimento);
            banco.inserirCliente(cliente);
            limparTela();
            console.log("Cliente cadastrado.");
            limparTelaEnter();
        }, "Cadastrar cliente", () => this.cadastrarCliente());
    }
    consultarCliente() {
        validacao.tentativa(() => {
            console.log(`--Consultar cliente pelo CPF--\n`);
            let cpf = validacao.validarTexto("CPF: ");
            let clienteProcurado;
            clienteProcurado = banco.consultaPorCpf(cpf);
            limparTela();
            console.log(`Cliente Consultado: `);
            banco.listarCliente(clienteProcurado);
            limparTelaEnter();
        }, "Consultar cliente", () => this.consultarCliente());
    }
    associarCliente() {
        validacao.tentativa(() => {
            console.log(`--Associar conta a um cliente--\n`);
            const numero = validacao.validarTexto("Número da conta: ");
            const cpf = validacao.validarTexto("CPF: ");
            let cliente = banco.consultaPorCpf(cpf);
            banco.associarContaCliente(numero, cpf);
            limparTela();
            console.log(`Cliente e conta associados: `);
            banco.listarCliente(cliente);
            limparTelaEnter();
        }, "Associar conta a cliente", () => this.associarCliente());
    }
    saldoTotalCliente() {
        validacao.tentativa(() => {
            console.log(`--Saldo total do cliente--\n`);
            let cpf = validacao.validarTexto("CPF: ");
            let cliente = banco.consultaPorCpf(cpf);
            limparTela();
            let saldo = banco.totalizarSaldoCliente(cpf);
            console.log(`
          Saldo Total de ${cliente.nome}: R$ ${saldo.toFixed(2)}`);
            limparTelaEnter();
        }, "Totalizar saldo do cliente", () => this.saldoTotalCliente());
    }
    listarContasDoCliente() {
        validacao.tentativa(() => {
            console.log("--Listar contas do cliente--");
            let cpf = validacao.validarTexto("CPF: ");
            let cliente = banco.consultaPorCpf(cpf);
            limparTela();
            banco.listarContasCliente(cpf);
            limparTelaEnter();
        }, "Listar contas de cliente", () => this.listarContasDoCliente());
    }
}
let b = new App();
b.menu();
//# sourceMappingURL=app.js.map