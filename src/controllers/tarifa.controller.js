class TarifaController {

  static calculate( minutosPlano, tempo, tarifa ){

    return {
      valorComFaleMais : minutosPlano >= tempo ? 0 : ( tempo - minutosPlano ) * tarifa,
      valorSemFaleMais : tempo * tarifa
    };
    
  }

}

export default TarifaController;