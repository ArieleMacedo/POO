
class Circulo {
    raio:number = 0;

    calcularAreaC(){
        return this.raio**2 * 3.14;
    }
    calcularPerimetroC(){
        return 2 * 3.14 * this.raio;
    }
}

let circulo1 = new Circulo();

circulo1.raio = 7;

console.log(circulo1.calcularAreaC());
console.log(circulo1.calcularPerimetroC());