class TradutorEmojis {
  dicionario: { [palavra: string]: string } = {
    amor: "❤️ ",
    futebol: "⚽ ",
    cachorro: "🐶 ",
    gato: "🐈 ",
  };

  traduzir(frase: string): string {
    let palavras: string[] = frase.split(" ");
    let traduzir = palavras.map((item) => {
      if (this.dicionario[item]) {
        item = this.dicionario[item] as string;
      }
      return item;
    });

    let resultado: string = traduzir.join(" ");
    return resultado;
  }
}

let tradutor = new TradutorEmojis();
console.log(tradutor.traduzir("O amor da minha vida é um gato !"));
