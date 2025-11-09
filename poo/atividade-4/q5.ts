class Conta{
    numero: string;
    saldo: number;
    

    constructor(numero:string, saldoInicial: number){
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    depositar (valor:number): void{
        this.saldo = this.saldo + valor
    }
    sacar(valor:number): void{
        this.saldo = this.saldo - valor
    }
    consultarSaldo(): number{
        return this.saldo
    }
    transferir(contaDestino: Conta, valor:number): void{
        this.sacar(valor);
        contaDestino.depositar(valor);
        
    }
}

let c1: Conta = new Conta("1",100);
let c2= new Conta("2",100);
let c3: Conta

c1 = c2
c3= c1;

c1.sacar(10);
c1.transferir(c2, 50)

console.log(c1.consultarSaldo())
console.log(c2.consultarSaldo())
console.log(c3.consultarSaldo())

/*
a)O resultado é 90 porque c2 foi atribuido para c1 e
c1 foi atribuido para c3, estao todos apontando para a mesma area de memoria

b)ele é perde a referencia.
*/

