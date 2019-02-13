import Data from '../data/data.json';

class TarifaProvider {

  constructor(){
    this.tarifas = Data.tarifas;
  }

  getTarifas(){
    return this.tarifas;
  }

  getOrigens(){
    let origens = [];

    this.tarifas.forEach(tarifa => {
      if (origens.indexOf(tarifa.origem) === -1) 
        origens.push(tarifa.origem);
    });

    return origens;
  }

  getDestinos( origem ){

    let destinos = [];

    if ( !origem ){

      this.tarifas.forEach(tarifa => {
        if (destinos.indexOf(tarifa.destino) === -1) 
          destinos.push(tarifa.origem);
      });

    }

    else {

      this.tarifas.forEach(tarifa => {
        if ( tarifa.origem === origem && destinos.indexOf(tarifa.destino) === -1 )
          destinos.push(tarifa.destino);
      });

    }

    return destinos;
  }

  getTarifa(origem, destino){

    let valor = 0;
    
    this.tarifas.forEach(tarifa => {
      if ( tarifa.origem === origem && tarifa.destino === destino ){
        valor = tarifa.valor;
        return
      }
    });

    return valor;
  }

}

export default TarifaProvider;