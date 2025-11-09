"use strict";
/*
O erro de compilação é causado porque quando utilizamos o constructor
o valor do atributo deve ser colocado quando instanciamos o new()
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Radio {
    volume;
    constructor(volume) {
        this.volume = volume;
    }
}
let r = new Radio(10);
console.log(r.volume);
//# sourceMappingURL=q4.js.map