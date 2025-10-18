const nomeAleatorio = (nomes: string[]): string => {
  if (nomes.length === 0) {
    throw new Error("A lista de nomes está vazia");
  }
  const i = Math.floor(Math.random() * nomes.length);
  return nomes[i] as string;
};

const array = ["ariele", "camila", "madson", "luna", "vitoria", "cláudia"];
console.log(nomeAleatorio(array));
