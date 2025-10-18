"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Autenticacao {
    usuario = " ";
    senha = " ";
    validar() {
        if (this.usuario == "admin" && this.senha == "1234")
            return `Verdadeiro. Usuario Válido`;
        return `Falso. Usuario Não Autenticado`;
    }
}
let user1 = new Autenticacao();
user1.usuario = "ariele";
user1.senha = "1234";
console.log(user1.validar());
let user = new Autenticacao();
user.usuario = "admin";
user.senha = "1234";
console.log(user.validar());
//# sourceMappingURL=q10.js.map