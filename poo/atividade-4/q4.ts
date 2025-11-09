/*
O erro de compilação é causado porque quando utilizamos o constructor 
o valor do atributo deve ser colocado quando instanciamos o new()
*/

class Radio{
    volume:number;
    constructor(volume: number){
        this.volume = volume;
    }
}

let r: Radio = new Radio(10);

console.log(r.volume)
