class Conta{
    id: number;
    numero: string;
    saldo: number;
    

    constructor(id:number, numero:string, saldoInicial: number){
        this.id = id;
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    depositar (valor:number): void{
        this.saldo = this.saldo + valor;
    }
    sacar(valor:number): boolean{
        if (valor > this.saldo){
            console.log("Saldo insuficiente para saque");
            return false;
        }
        this.saldo -= valor;
        return true;
    }
    consultarSaldo(): number{
        return this.saldo;
    }
    transferir(contaDestino: Conta, valor:number): boolean{
        if (this.sacar(valor)){
           contaDestino.depositar(valor);
           return true;
        }
        return false;
    }
}
//objetos sao passados por referencia

let conta1 = new Conta(1,"2",0);
let conta2 = new Conta(2,"3",0);

conta1.depositar(299);
conta1.sacar(500);
console.log("Saldo conta1:",conta1.consultarSaldo())

conta2.depositar(300);
console.log("Saldo Conta2:",conta2.consultarSaldo())

conta1.transferir(conta2, 400)

console.log("Saldo Conta1 após transferência:",conta1.consultarSaldo())
console.log("Saldo Conta2 após transferência:",conta2.consultarSaldo())

