
function imprimirSaudacao(nome:string,saudacao:string = "Sr"): string{
    return saudacao + " " + nome;
}

console.log(imprimirSaudacao('ariele','minha'))
console.log(imprimirSaudacao('ariele'))