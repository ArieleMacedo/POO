class Sorteio {
  nomes: string[] = [];

  adicionar(nome: string): void {
    this.nomes.push(nome);
  }
  sortear(): string {
    return this.nomes[Math.floor(Math.random() * this.nomes.length)] as string;
  }
}

let a1 = new Sorteio();

a1.adicionar("ariele");
a1.adicionar("madson");
a1.adicionar("luna");

console.log(a1.sortear());
