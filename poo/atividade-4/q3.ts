class Hotel{
    quantReservas: number;

    constructor(qtreservas: number){
        this.quantReservas = qtreservas;
    }
    adicionarReservas(): void{
        this.quantReservas++;
    }

}

let hotel: Hotel = new Hotel(2);
console.log(hotel.quantReservas)
