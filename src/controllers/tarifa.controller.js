class TarifaController {

  static calculate( minutosPlano, tempo, tarifa ){

    let valorComFaleMais = (tempo - minutosPlano <= 0 ) ? 0 : ( tempo - minutosPlano ) * tarifa;
    let valorSemFaleMais = tempo * tarifa;

    return {
      valorComFaleMais : valorComFaleMais.toFixed(2),
      valorSemFaleMais : valorSemFaleMais.toFixed(2)
    };
    
  }

}

export default TarifaController;