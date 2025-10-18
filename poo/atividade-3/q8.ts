const dobrar = (array: number[]): number[] => {
  return array.map((num: number) => {
    return num * 2;
  });
};

const soma = (numero: number[]): number => {
  return numero.reduce((acumulado, num) => {
    return acumulado + num;
  }, 0);
};

// function soma(numero: number[]): number {
//     const total = numero.reduce((acumulado,num) => acumulado + num,0)
//     return total
// }
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log("Elementos Dobrados:\n", dobrar(array).join(" "));
console.log("Soma dos Elementos:", soma(dobrar(array)));

//  const dobrarEtotal= (array: number[]): number => {
//      let arrayDobrado = array.map(num => num *2);
//      console.log(arrayDobrado.join(" "))
//      let arrayTotal = arrayDobrado
//      return arrayTotal.reduce((acumulado,num) => acumulado + num, 0);
// }

// const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

// console.log(dobrarEtotal(array))
