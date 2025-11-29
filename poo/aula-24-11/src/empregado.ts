class Empregado{
    salario: number = 1500;
    calcularSalario(){
        return this.salario
    }
}

class Diarista extends Empregado{
    
    calcularSalario(): number {
     return super.calcularSalario()/ 30
    }
}
class Horista extends Diarista{
    
    calcularSalario(): number {
     return super.calcularSalario()/ 24
    }
}

let empregado: Empregado = new Empregado()
let diarista: Diarista = new Diarista()
let horista: Horista = new Horista()

console.log(diarista.calcularSalario());
console.log(horista.calcularSalario());