"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 'hello world';
console.log(a);
class Retangulo {
    // atributos
    lado1 = 0;
    lado2 = 0;
    //método
    calcularArea() {
        return this.lado1 * this.lado2;
    }
    calcularPerimetro() {
        return (this.lado1 + this.lado2) * 2;
    }
}
let retangulo1 = new Retangulo();
/*  objeto ↑     o operador new instancia ou cria um objeto.
    Retangulo() se chama construtor
*/
// alterando o valor os atributos
retangulo1.lado1 = 10;
retangulo1.lado2 = 20;
// chamando o método do retângulo chamado calcular área
console.log(retangulo1.calcularArea());
let retangulo2 = new Retangulo();
retangulo2.lado1 = 8;
retangulo2.lado2 = 5;
console.log(retangulo2.calcularPerimetro());
//# sourceMappingURL=q7.js.map