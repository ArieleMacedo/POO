class SituacaoFinaceira {
    valorCreditos:number = 0;
    valorDebitos: number = 0;

    calcularSaldo(){
        return this.valorCreditos - this.valorDebitos;
    }
}

let saldo = new SituacaoFinaceira();

saldo.valorCreditos = 400;
saldo.valorDebitos = 1000;

console.log(saldo.calcularSaldo());
