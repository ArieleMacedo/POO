class Conta {
  private _id: number;
  private _numero: string;
  private _saldo: number;
  private _cliente!: Cliente;
  private _dataDeAbertura: Date;

  constructor(numero: string, saldo: number) {
    this._id = 0;
    this._numero = numero;
    this._saldo = saldo;
    this._dataDeAbertura = new Date();
  }

  sacar(valor: number): void {
    this._saldo = this._saldo - valor;
  }

  depositar(valor: number): void {
    this._saldo = this._saldo + valor;
  }

  get saldo(): number {
    return this._saldo;
  }

  transferir(contaDestino: Conta, valor: number): void {
    // this.saldo = this.saldo - valor;
    // contaDestino.saldo = contaDestino.saldo + valor;

    this.sacar(valor);
    contaDestino.depositar(valor);
  }

  get numero(): string {
    return this._numero;
  }

  set id(umId: number) {
    this._id = umId;
  }

  get cliente(): Cliente {
    return this._cliente;
  }

  set cliente(umCliente: Cliente) {
    if (umCliente) {
      this._cliente = umCliente;
    }
  }
}

class Cliente {
  private _id: number;
  private _nome: string;
  private _cpf: string;
  private _dataNascimento: Date;
  private _contas: Conta[];

  constructor(nome: string, cpf: string, dataNascimento: Date) {
    this._id = 0;
    this._nome = nome;
    this._cpf = cpf;
    this._dataNascimento = dataNascimento;
    this._contas = [];
  }

  set id(umId: number) {
    this._id = umId;
  }

  get cpf(): string {
    return this._cpf;
  }

  get nome(): string {
    return this._nome;
  }

  get contas(): Conta[] {
    return this._contas;
  }
}

class Banco {
  private _contas: Conta[];
  private _clientes: Cliente[];
  private _idClienteAtual: number;
  private _idContaAtual: number;

  constructor() {
    this._contas = [];
    this._clientes = [];
    this._idClienteAtual = 1;
    this._idContaAtual = 1;
  }

  inserirConta(conta: Conta) {
    conta.id = this._idContaAtual++;

    if (!this.consultarConta(conta.numero)) {
      this._contas.push(conta);
    }
  }

  consultarConta(numero: string): Conta {
    let contaProcurada!: Conta;

    for (let conta of this._contas) {
      if (conta.numero == numero) {
        contaProcurada = conta;
        break;
      }
    }

    return contaProcurada;
  }

  private consultarContaPorIndice(numero: string): number {
    let indiceProcurado: number = -1;

    for (let i = 0; i < this._contas.length; i++) {
      if (this._contas[i]!.numero == numero) {
        indiceProcurado = i;
        break;
      }
    }

    return indiceProcurado;
  }

  excluir(numero: string): void {
    let indiceProcurado: number = this.consultarContaPorIndice(numero);

    if (indiceProcurado != -1) {
      if (this.consultarConta("numero").cliente) {
        return;
      }

      for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
        this._contas[i] = this._contas[i + 1]!;
      }
      this._contas.pop();
    }
  }

  alterar(conta: Conta): void {
    let contaProcurada: Conta = this.consultarConta(conta.numero);

    if (contaProcurada) {
      contaProcurada = conta;
    }
  }

  inserirCliente(cliente: Cliente): void {
    cliente.id = this._idClienteAtual++;

    if (!this.consultarCliente(cliente.cpf)) {
      this._clientes.push(cliente);
    }
  }

  consultarCliente(cpf: string): Cliente {
    let clienteProcurado!: Cliente;

    for (let cliente of this._clientes) {
      if (cliente.cpf == cpf) {
        clienteProcurado = cliente;
        break;
      }
    }
    return clienteProcurado;
  }

  excluirCliente(cpf: string) {
    let indice = this._clientes.findIndex((c) => c.cpf == cpf);

    if (indice >= 0 && this._clientes[indice]!.contas.length == 0) {
      this._clientes.splice(indice, 1);
    }
  }

  sacar(numero: string, valor: number): void {
    let contaProcurada: Conta = this.consultarConta(numero);

    if (contaProcurada) {
      contaProcurada.sacar(valor);
    }
  }

  depositar(numero: string, valor: number): void {
    let contaProcurada: Conta = this.consultarConta(numero);

    if (contaProcurada) {
      contaProcurada.depositar(valor);
    }
  }

  transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
    let contaOrigem: Conta = this.consultarConta(numeroOrigem);
    let contaDestino: Conta = this.consultarConta(numeroDestino);

    if (contaOrigem && contaDestino) {
      contaOrigem.transferir(contaDestino, valor);
    }
  }

  associarContaCliente(numeroConta: string, cpfCliente: string): void {
    let contaProcurada: Conta = this.consultarConta(numeroConta);
    let clienteProcurado: Cliente = this.consultarCliente(cpfCliente);

    if (
      contaProcurada &&
      clienteProcurado &&
      !this.jaExisteContaParaCliente(
        clienteProcurado.cpf,
        contaProcurada.numero
      )
    ) {
      contaProcurada.cliente = clienteProcurado;
      clienteProcurado.contas.push(contaProcurada);
    }
  }

  jaExisteContaParaCliente(cpf: string, numero: string): boolean {
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

  pesquisarContaPorCPF(cpf: string): Conta {
    let contaProcurada!: Conta;

    for (let conta of this._contas) {
      if (conta.cliente && conta.cliente.cpf == cpf) {
        contaProcurada = conta;
        break;
      }
    }

    return contaProcurada;
  }

  listarContasSemCliente(): Conta[] {
    let contas: Conta[] = [];

    for (let conta of this._contas) {
      if (!conta.cliente) {
        contas.push(conta);
      }
    }

    return contas;
  }

  listarContasCliente(cpf: string): Conta[] {
    let clienteProcurado: Cliente = this.consultarCliente(cpf);
    let contas: Conta[] = [];

    if (clienteProcurado) {
      contas = clienteProcurado.contas;
    }
    return contas;
  }

  totalizarSaldoCliente(cpf: string): number {
    let clienteProcurado: Cliente = this.consultarCliente(cpf);
    let total: number = 0;
    if (clienteProcurado) {
      for (let conta of clienteProcurado.contas) {
        total += conta.saldo;
      }
    }

    return total;
  }

  obterQuantidadeDeContas(): number {
    return this._contas.length;
  }

  obterTotalDinheiroDepositado(): number {
    let total: number = 0;

    for (let conta of this._contas) {
      total = total + conta.saldo;
    }
    return total;
  }

  calcularMediaSaldoContas(): number {
    return this.obterTotalDinheiroDepositado() / this.obterQuantidadeDeContas();
  }

  realizarOrdemBancaria(
    numeroContaOrigem: string,
    numerosContasDestino: string[],
    valor: number
  ): void {
    let contaOrigem: Conta = this.consultarConta(numeroContaOrigem);
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

  transferirTitularidade(numeroConta: string, cpf: string): void {
    let contaProcurada: Conta = this.consultarConta(numeroConta);
    let clienteProcurado: Cliente = this.consultarCliente(cpf);

    if (!contaProcurada && !clienteProcurado) {
      return;
    }

    if (
      this.jaExisteContaParaCliente(clienteProcurado.cpf, contaProcurada.numero)
    ) {
      return;
    }

    this.associarContaCliente(contaProcurada.numero, clienteProcurado.cpf);
  }
  carregarDados() {
    let conta1: Conta = new Conta("111-1", 300);
    let conta2: Conta = new Conta("222-2", 0);
    let conta3: Conta = new Conta("333-3", 0);
    let conta4: Conta = new Conta("444-4", 0);

    this.inserirConta(conta1);
    this.inserirConta(conta2);
    this.inserirConta(conta3);
    this.inserirConta(conta4);

    let cliente1: Cliente = new Cliente("Ely", "825", new Date(1979, 6, 29));
    let cliente2: Cliente = new Cliente(
      "Nicolas",
      "999",
      new Date(2004, 4, 24)
    );

    this.inserirCliente(cliente1);
    this.inserirCliente(cliente2);

    this.associarContaCliente("111-1", "825");
    this.associarContaCliente("222-2", "999");
    this.associarContaCliente("333-3", "825");
  }
    renderJuros(numero: string): void {
    let contaProcurada = banco.consultarConta(numero);
    if (contaProcurada){
        if (contaProcurada instanceof Poupanca){
            (<Poupanca> contaProcurada).renderJuros( );
        }
    }else{
        //mais tarde fazer um thwrow error
        console.log("Falhou")
        return
    }
    }
}

export class Poupanca extends Conta {
  private _taxaJuros: number;

  constructor(numero: string, saldo: number, taxaJuros: number) {
    super(numero, saldo);
    this._taxaJuros = taxaJuros;
  }
  renderJuros(): void {
    let juros = (this.saldo * this._taxaJuros) / 100;
    this.depositar(juros);
  }
}

export class ContaImposto extends Conta {
  private _taxaDesconto: number;

  constructor(numero: string, saldo: number, taxaDesconto: number) {
    super(numero, saldo);
    this._taxaDesconto = taxaDesconto;
  }

  sacar(valor: number): void {
    let desconto = (this.saldo * this._taxaDesconto) / 100;
    let total = valor + desconto;
    super.sacar(total);
  }
}

let conta1: Conta = new Conta("111", 100);
let poupanca1: Poupanca = new Poupanca("222", 100, 3);

let banco: Banco = new Banco();

banco.inserirConta(conta1);
banco.inserirConta(poupanca1);
banco.transferir("111", "222", 10);

let contaimposto: ContaImposto = new ContaImposto("123", 100, 0.38);
banco.inserirConta(contaimposto)
banco.sacar("123", 50)
console.log(banco.consultarConta('123'))
/*
banco.realizarOrdemBancaria('111-1', ['0', '222-2', '333-3', '444-4'], 100);
banco.transferirTitularidade('111-1', '999');
banco.obterQuantidadeDeContas();

banco.contas = [];
banco.clientes = [];
conta1.saldo = -111110000000000000;
*/
export { Conta, Cliente, Banco };
