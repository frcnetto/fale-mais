import Data from '../data/data.json';

class PlanoProvider {

  constructor(){
    this.planos = Data.planos;
  }

  getPlanos(){
    return this.planos;
  }

}

export default PlanoProvider;