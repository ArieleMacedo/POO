"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hotel {
    quantReservas;
    constructor(qtreservas) {
        this.quantReservas = qtreservas;
    }
    adicionarReservas() {
        this.quantReservas++;
    }
}
let hotel = new Hotel(2);
console.log(hotel.quantReservas);
//# sourceMappingURL=q3.js.map