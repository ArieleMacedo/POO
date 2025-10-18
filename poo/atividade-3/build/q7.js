"use strict";
// function imparPar(numero:number) : boolean{
//     return numero % 2 === 0
// }
Object.defineProperty(exports, "__esModule", { value: true });
// const filtrarPar1 = (array: number[]): number[] => array.filter(imparPar);
// const array1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// console.log(filtrarPar1(array1))
const filtrarPar = (array) => array.filter((num) => num % 2 === 0);
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(filtrarPar(array));
//# sourceMappingURL=q7.js.map