class Funcionario {
  private _nome: string;
  private _cpf: string;
  private _salario: number;

  constructor(nome: string, cpf: string, salario: number) {
    this._nome = nome;
    this._cpf = cpf;
    this._salario = salario;
  }
    get nome(){
     return this._nome 
  }
    get cpf(){
     return this._cpf
  }
   validar(): boolean{
     return this._cpf.length == 11
  }

}

class Gerente extends Funcionario {
  private _login: string;
  private _senha: string;

  constructor(
    nome: string,
    cpf: string,
    salario: number,
    login: string,
    senha: string
  ) {
    super(nome, cpf, salario);
    this._login = login;
    this._senha = senha;
  }

  autenticar(login: string, senha: string) {
    return this._login === login && this._senha === senha;
  }


}
class Diretor extends Gerente {
  private _bonus: number;

  constructor(
    nome: string,
    cpf: string,
    salario: number,
    login: string,
    senha: string,
    bonus: number
  ) {
    super(nome, cpf, salario, login, senha);
    this._bonus = bonus;
  }
}

let funcionario: Funcionario = new Funcionario("ariele", "123", 1000);
let gerente: Gerente = new Gerente('pedro', '666', 2000, 'pedro.silva', '1234');
let diretor: Diretor = new Diretor('joao', '999',3000, 'joao.sousa', '321', 1000);

console.log(diretor.nome);
console.log(diretor.validar())
