"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Empregado {
    salario = 1500;
    calcularSalario() {
        return this.salario;
    }
}
class Diarista extends Empregado {
    calcularSalario() {
        return super.calcularSalario() / 30;
    }
}
class Horista extends Diarista {
    calcularSalario() {
        return super.calcularSalario() / 24;
    }
}
let empregado = new Empregado();
let diarista = new Diarista();
let horista = new Horista();
console.log(diarista.calcularSalario());
console.log(horista.calcularSalario());
//# sourceMappingURL=empregado.js.map