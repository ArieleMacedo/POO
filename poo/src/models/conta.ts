import {Cliente} from "./cliente.js"

export class Conta {
  private _id: number;
  private _numero: string;
  private _cliente!: Cliente;
  private _dataAbertura: Date;
  private _saldo: number;

  constructor(
    id: number,
    numero: string,
    dataAbertura: Date,
    saldoInicial: number, 
  ) {
    this._id = id;
    this._numero = numero;
    this._dataAbertura = dataAbertura;
    this._saldo = saldoInicial;
  }
  get id(){
    return this._id
  }

  get saldo(): number{
    return this._saldo
  }

  get numero():string{
    return this._numero
  }

  set id(umId){
    this._id = umId;
  }

  get cliente(): Cliente{
    return this._cliente;
  }

  set cliente(umCliente: Cliente){
    if (umCliente){
      this._cliente = umCliente
    }
  }
  
  depositar(valor: number): void {
    this._saldo = this.saldo + valor;
  }

  sacar(valor: number): void {
    if (this.validarSaldo(this.saldo, valor)) {
      this._saldo = this.saldo - valor;
    } else {
      console.log("Saldo Insuficiente");
    }
  }


  transferir(contaDestino: Conta, valor: number): void {
    if (this.validarSaldo(this.saldo, valor)){
      this.sacar(valor);
      contaDestino.depositar(valor);
    }else{
      console.log("Transfêrencia Não Realizada. Saldo Insuficiente")
    }
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  validarSaldo(saldo: number, valor: number): boolean {
    return saldo >= valor;
  }
}
