class Calculadora{
    private _operando1;
    private _operando2;

    constructor(op1: number, op2: number){
        this._operando1 = op1;
        this._operando2 = op2;
    }
    
    get op1(){
        return this._operando1
    } 
    get op2(){
        return this._operando2
    } 
    set op1(op: number){
      this._operando1 = op;
    }

    set op2(op: number){
      this._operando2 = op;
    }

    soma(): number{
       return this.op1 + this.op2;
    }

    multiplicacao(): number{
       return this.op1 * this.op2;
    }
}

let calculadora: Calculadora = new Calculadora(2,3);
calculadora.op1 = 4
console.log(calculadora.op1)
console.log(calculadora.soma())
console.log(calculadora.multiplicacao())