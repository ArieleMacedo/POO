class Veiculo {
  private _placa: string;
  private _ano: number;

  constructor(placa: string, ano: number) {
    this._ano = ano;
    this._placa = placa;
  }
  get placa() {
    return this._placa;
  }
  get ano() {
    return this._ano;
  }
}

class Carro extends Veiculo {
  private _modelo: string;

  constructor(placa: string, ano: number, modelo: string) {
    super(placa, ano);
    this._modelo = modelo;
  }
}

class CarroEletrico extends Carro {
  private _autonomiaBateria: number;

  constructor(
    placa: string,
    ano: number,
    modelo: string,
    autonomiaBateria: number
  ) {
    super(placa, ano, modelo);
    this._autonomiaBateria = autonomiaBateria;
  }
}

let v1: Veiculo = new Veiculo("a23", 2023);
let v2: Veiculo = new Carro('ababa', 2003, 'marea');
let v3 : Veiculo = new CarroEletrico('baba', 2003, 'tesla', 900);

