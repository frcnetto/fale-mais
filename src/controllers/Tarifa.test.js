import TarifaController from './Tarifa.controller';

it('valida calculos de tarifa', () => {

  //minutosPlano, tempo, tarifa

  /**
   * Tempo falado dentro da cobertura do plano
   */

  let result = TarifaController.calculate(60, 59, 1);

  expect(result.valorComFaleMais).toEqual(0);
  expect(result.valorSemFaleMais).toEqual(59);
  
  /**
   * Tempo falado superior a cobertura do plano
   */

  result = TarifaController.calculate(30, 59, 1);

  expect(result.valorComFaleMais).toEqual(29);
  expect(result.valorSemFaleMais).toEqual(59);

});