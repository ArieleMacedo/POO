import { Cliente } from "./cliente.js";
import { Banco } from "./banco.js";
import { Conta } from "./conta.js";
import { Validacoes } from "./validacoes.js";
import { limparTela, limparTelaEnter } from "./utils.js";
let validacao: Validacoes = new Validacoes();
import PromptSync from "prompt-sync";
const input = PromptSync();

class App {
  private _banco: Banco;

  constructor(){
    this._banco = new Banco();
    this._banco.carregarDados()
  }
  menu(): void {
    limparTela();

    let opcao;
    do {
      console.log(`
        -------------------
         this_banco do Nordeste
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

  menuContas(): void {
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
          this.totalDothis_banco();
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
  menuCliente(): void {
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

  cadastrarConta(): void {
    validacao.tentativa(
      () => {
        console.log(`--Inserir Conta--\n`);
        let id = validacao.numeroInteiro("ID: ");
        let numero = validacao.validarTexto("Número da conta: ");
        let dataAbertura = new Date();
        let saldo = 0;
        const conta = new Conta(id, numero, dataAbertura, saldo);

        this._banco.inserirConta(conta);

        limparTela();
        console.log("Conta Inserida.");
        limparTelaEnter();
      },
      "Inserir conta",
      () => this.cadastrarConta()
    );
  }

  consultarConta(): void {
    validacao.tentativa(
      () => {
        console.log(`--Consultar conta pelo número--\n`);
        let numero = validacao.validarTexto("Número da conta: ");
        let contaProcurada;
        limparTela();
        contaProcurada = this._banco.consultaPorNumero(numero);
        this._banco.listarConta(contaProcurada.numero);
        limparTelaEnter()
      },
      "Consultar conta",
      () => this.consultarConta()
    );
  }

  sacarDaConta(): void {
    validacao.tentativa(
      () => {
        console.log(`--Sacar--\n`);
        let numero = validacao.validarTexto("Número: ");
        let valor = validacao.numFloatPositivo("Valor: ");
        let conta = this._banco.consultaPorNumero(numero);
        limparTela();
        this._banco.sacar(numero, valor);
        console.log(
          `Saldo da Conta ${conta.numero}: R$ `,
          conta.saldo.toFixed(2)
        );
      },
      "Sacar",
      () => this.sacarDaConta()
    );
  }

  depositarNaConta(): void {
    validacao.tentativa(
      () => {
        console.log(`--Depositar--\n`);
        let numero = validacao.validarTexto("Número: ");
        let valor = validacao.numFloatPositivo("Valor: ");
        let conta = this._banco.consultaPorNumero(numero);
        limparTela();
        this._banco.depositar(numero, valor);
        console.log("Depósito realizado com sucesso.");
        console.log(
          `
          Saldo da Conta ${conta.numero}: R$ `,
          conta.saldo.toFixed(2)
        );
        limparTelaEnter();
      },
      "Depositar",
      () => this.depositarNaConta()
    );
  }

  transferir(): void {
    validacao.tentativa(
      () => {
        let numero = validacao.validarTexto("Número da conta origem: ");
        let valor = validacao.numFloatPositivo("Valor: ");
        let contaDestino = validacao.validarTexto("Número da conta destino: ");
        let contaOrigem = this._banco.consultaPorNumero(numero);

        limparTela();
        this._banco.transferir(contaOrigem.numero, contaDestino, valor);
        console.log(
          `Conta de origem: ${contaOrigem.numero} | Novo saldo: ${contaOrigem.saldo}`
        );
        console.log(`\nExtrato da Conta Destino: `);
        this._banco.listarConta(contaDestino);
        limparTelaEnter();
      },
      "Depositar",
      () => this.transferir()
    );
  }

  ordemBancaria(): void {
    validacao.tentativa(
      () => {
        console.log("--Ordem Bancaria--");
        let numero = validacao.validarTexto("Número da conta origem: ");
        let contaOrigem = this._banco.consultaPorNumero(numero);
        let valor = validacao.numFloatPositivo("Valor: ");
        let contasDestino: string[] = validacao.validarTexto(
          "Contas destino separa por traço (-): "
        ).split("-");

        this._banco.ordemBancaria(contaOrigem.numero, contasDestino, valor);
        limparTela();
        console.log(`Ordem bancaria realizada.\n`);
        console.log(
          `Conta de origem: ${contaOrigem.numero} | Novo saldo: ${contaOrigem.saldo}`
        );
        console.log(`\nExtrato das Contas Destino: `);
        for (let conta of contasDestino) {
          this._banco.listarConta(conta);
        }
        limparTelaEnter();
      },
      "Realizar ordem bancaria",
      () => this.ordemBancaria()
    );
  }

  transferirTitularidade(): void {
    validacao.tentativa(
      () => {
        console.log("--Tranferir Titularidade--");

        let numero = validacao.validarTexto("Número: ");
        let conta = this._banco.consultaPorNumero(numero);
        let cpf = validacao.validarTexto("CPF: ");
        let cliente = this._banco.consultaPorCpf(cpf);
        limparTela();
        console.log("Tranferencia de titularidade realizada.");
        console.log(
`       Antigo titular da conta: ${conta.cliente.nome}`);

        this._banco.alteraTitularidade(conta.numero, cpf);
        console.log(
`       Novo titular: ${conta.cliente.nome}`);
          limparTelaEnter();
      },
      "Alterar titularidade",
      () => this.transferirTitularidade()
    );
  }

  listarContasSemCliente(): void {
    this._banco.listarContasSemCliente();
    limparTelaEnter();
    let associar = validacao.numIntMinMax(
      "Deseja atribuir uma titularidade a conta?: (1- Sim | 2- Não): ",
      1,
      2
    );
    if (associar === 1) {
      this.associarCliente();
    } else {
      return;
    }
  }

  totalDothis_banco(): void {
    let saldo = this._banco.saldoTotal();
    console.log(`Saldo total do this_banco: R$ ${saldo.toFixed(2)}`);
    limparTelaEnter();
    return;
  }

  excluirConta(): void {
    validacao.tentativa(
      () => {
        console.log(`--Excluir conta--\n`);
        let numero = validacao.validarTexto("Número: ");
        let conta = this._banco.consultaPorNumero(numero);
        this._banco.excluirConta(conta.numero);
        limparTela();
        console.log("Conta excluida.")
        limparTelaEnter();
      },
      "Excluir conta",
      () => this.excluirConta()
    );
  }

  cadastrarCliente(): void {
    validacao.tentativa(
      () => {
        console.log(`--Inserir Cliente--\n`);
        let id = validacao.numeroInteiro("ID: ");
        let nome = validacao.validarTexto("Nome: ");
        let cpf = validacao.validarTexto("CPF: ");
        let dataDeNascimento = validacao.lerDataNascimento();
        const cliente = new Cliente(id, nome, cpf, dataDeNascimento);
        this._banco.inserirCliente(cliente);
        limparTela();
        console.log("Cliente cadastrado.")
        limparTelaEnter()
      },
      "Cadastrar cliente",
      () => this.cadastrarCliente()
    );
  }

  consultarCliente(): void {
    validacao.tentativa(
      () => {
        console.log(`--Consultar cliente pelo CPF--\n`);
        let cpf = validacao.validarTexto("CPF: ");
        let clienteProcurado;
        clienteProcurado = this._banco.consultaPorCpf(cpf);
        limparTela();
        console.log(`Cliente Consultado: `);
        this._banco.listarCliente(clienteProcurado);
        limparTelaEnter();
      },
      "Consultar cliente",
      () => this.consultarCliente()
    );
  }

  associarCliente(): void {
    validacao.tentativa(
      () => {
        console.log(`--Associar conta a um cliente--\n`);
        const numero = validacao.validarTexto("Número da conta: ");
        const cpf = validacao.validarTexto("CPF: ");
        let cliente = this._banco.consultaPorCpf(cpf);
        this._banco.associarContaCliente(numero, cpf);
        limparTela()
        console.log(`Cliente e conta associados: `);
        this._banco.listarCliente(cliente);
        limparTelaEnter()
      },
      "Associar conta a cliente",
      () => this.associarCliente()
    );
  }
  saldoTotalCliente(): void {
    validacao.tentativa(
      () => {
        console.log(`--Saldo total do cliente--\n`);
        let cpf = validacao.validarTexto("CPF: ");
        let cliente = this._banco.consultaPorCpf(cpf);
        limparTela();
        let saldo = this._banco.totalizarSaldoCliente(cpf);
        console.log(`
          Saldo Total de ${cliente.nome}: R$ ${saldo.toFixed(2)}`);
        limparTelaEnter()
      },
      "Totalizar saldo do cliente",
      () => this.saldoTotalCliente()
    );
  }

  listarContasDoCliente(): void {
    validacao.tentativa(
      () => {
        console.log("--Listar contas do cliente--");
        let cpf = validacao.validarTexto("CPF: ");
        let cliente = this._banco.consultaPorCpf(cpf);
        limparTela();
        this._banco.listarContasCliente(cpf);
        limparTelaEnter();
      },
      "Listar contas de cliente",
      () => this.listarContasDoCliente()
    );
  }
}
let b: App = new App();
b.menu();
