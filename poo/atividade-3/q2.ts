function imprimirSaudacao(nome: string, saudacao?: string): string {
  if (!saudacao) saudacao = "Sr/Sra";
  return saudacao + " " + nome;
}

console.log(imprimirSaudacao("ariele", "minha"));
console.log(imprimirSaudacao("ariele"));
