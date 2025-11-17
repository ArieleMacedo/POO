"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hora {
    _hora;
    _minutos;
    _segundos;
    constructor(hora, minutos, segundos) {
        this._hora = hora;
        this._minutos = minutos;
        this._segundos = segundos;
    }
    get hora() {
        return this._hora;
    }
    get minutos() {
        return this._minutos;
    }
    get segundos() {
        return this._segundos;
    }
    lerHoras() {
        let lerHora = String(this.hora).padStart(2, '0');
        let lerMinuto = String(this.minutos).padStart(2, '0');
        let lerSegundo = String(this.segundos).padStart(2, '0');
        return `${lerHora}:${lerMinuto}:${lerSegundo}`;
    }
}
let hora = new Hora(1, 23, 0);
console.log(hora.lerHoras());
//# sourceMappingURL=hora.js.map