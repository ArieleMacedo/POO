"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Veiculo {
    _placa;
    _ano;
    constructor(placa, ano) {
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
    _modelo;
    constructor(placa, ano, modelo) {
        super(placa, ano);
        this._modelo = modelo;
    }
}
class CarroEletrico extends Carro {
    _autonomiaBateria;
    constructor(placa, ano, modelo, autonomiaBateria) {
        super(placa, ano, modelo);
        this._autonomiaBateria = autonomiaBateria;
    }
}
let v1 = new Veiculo("a23", 2023);
let v2 = new Carro('ababa', 2003, 'marea');
let v3 = new CarroEletrico('baba', 2003, 'tesla', 900);
//# sourceMappingURL=carro.js.map