class Jogador {
  forca: number;
  nivel: number;
  pontos: number;

  constructor(forca: number, nivel: number, pontos: number) {
    this.forca = forca;
    this.nivel = nivel;
    this.pontos = pontos;
  }
  calcularAtaque(): number {
    return this.forca * this.nivel;
  }

  atacar(jogadorAtacado: Jogador): void {
    if (!jogadorAtacado.estaVivo()) {
      console.log("Jogador não está vivo");
      return;
    }
    let dano = this.calcularAtaque();
    jogadorAtacado.pontos = jogadorAtacado.pontos - dano;
    if (jogadorAtacado.pontos <= 0) {
      jogadorAtacado.pontos = 0;
      console.log("O jogador atacado foi derrotado");
    }
  }
  estaVivo(): boolean {
    return this.pontos > 0;
  }
}

let j1: Jogador = new Jogador(10, 1, 100);
let j2: Jogador = new Jogador(20, 3, 100);

j2.atacar(j1);
console.log("j1: está vivo? " + j1.estaVivo() + "  " + j1.pontos);
j1.atacar(j2);
console.log("j2: está vivo? " + j2.estaVivo() + "  " + j2.pontos);
j2.atacar(j1);
console.log("j1: está vivo? " + j1.estaVivo() + "  " + j1.pontos);
j2.atacar(j1);
j2.atacar(j1);
console.log("j1: está vivo? " + j1.estaVivo() + "  " + j1.pontos);
