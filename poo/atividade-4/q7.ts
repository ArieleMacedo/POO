class Equipamento{
    ligado: boolean ;

    constructor(ligado: boolean){
        this.ligado = ligado;
    }
    ligar(): void{
        if (this.ligado){
         console.log(`Este equipamento já está ligado.` )
        }else {
         this.ligado = true
    }

     
    }
    desligar(): void{
        if (!this.ligado){
         console.log(`Este equipamento já está desligado.` )
        }else{
        this.ligado = false
        }
    }
    inverter(): void{
        if (this.ligado){
         this.desligar()
        } 
        else{this.ligar()
    }
}
    estaLigado(): void{
    if (this.ligado)
     console.log("Equipamento Ligado")
    else
     console.log("Equipamento Desligado")
    }
}

let equi1: Equipamento = new Equipamento(false)

equi1.ligar()
equi1.estaLigado()

equi1.desligar()
equi1.estaLigado()

equi1.inverter()
equi1.estaLigado()
