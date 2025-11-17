class Hora {
  private _hora;
  private _minutos;
  private _segundos;

  constructor(hora: number, minutos: number, segundos: number) {
    this._hora = hora;
    this._minutos = minutos;
    this._segundos = segundos;
  }
  get hora() {
    return this._hora;
  }

  get minutos() {
    return this._minutos;
  }

  get segundos(){
    return this._segundos
  }

  lerHoras(): string{
   let lerHora = String(this.hora).padStart(2,'0')
   let lerMinuto = String(this.minutos).padStart(2,'0')
   let lerSegundo = String(this.segundos).padStart(2,'0')

   return `${lerHora}:${lerMinuto}:${lerSegundo}`

  }
}

let hora: Hora = new Hora(1,23,0)

console.log(hora.lerHoras())