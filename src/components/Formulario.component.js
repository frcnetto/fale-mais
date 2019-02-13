import React, { Component } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { PlanoProvider, TarifaProvider } from '../providers';
import TarifaController from '../controllers/Tarifa.controller'

class Formulario extends Component {

  constructor(props) {
    super(props);

    this.planoProvider  = new PlanoProvider();
    this.tarifaProvider = new TarifaProvider();

    this.onChangeOrigem    = this.onChangeOrigem.bind(this);
    this.onChangeEscolhido = this.onChangeEscolhido.bind(this);
    this.calculate         = this.calculate.bind(this);
    
    this.state             = {
      origens         : [],
      origemEscolhida : "",
      destinos        : [],
      destinoEscolhido: "",
      tempo           : 0,
      planos          : [],
      planoEscolhido  : "",
      valorComFaleMais: "",
      valorSemFaleMais: ""
    };
  }

  componentWillMount() {
    
    let origens  = this.tarifaProvider.getOrigens();
    let planos   = this.planoProvider.getPlanos();
    let destinos = this.tarifaProvider.getDestinos(origens[0]);

    this.setState({
      origens         : origens,
      origemEscolhida : origens[0],
      destinos        : destinos,
      destinoEscolhido: destinos[0],
      planos          : planos,
      planoEscolhido  : planos[0]
    });
  }

  onChangeOrigem( event ) {

    let origem   = event.target.value;
    let destinos = this.tarifaProvider.getDestinos(origem);
    
    this.setState({
      origemEscolhida : origem,
      destinos        : destinos,
      destinoEscolhido: destinos[0]
    });
  }

  onChangeEscolhido( event ){
    this.setState({ [event.target.name]: event.target.value });
  }

  calculate(){

    let minutosPlano = this.state.planoEscolhido;
    let tempo        = this.state.tempo;
    let tarifa       = this.tarifaProvider.getTarifa(this.state.origemEscolhida, this.state.destinoEscolhido);

    let resultado    = TarifaController.calculate( minutosPlano, tempo, tarifa );

    this.setState({
      valorComFaleMais : resultado.valorComFaleMais,
      valorSemFaleMais : resultado.valorSemFaleMais
    });
    
  }

  render() {
    return (
      <Container className="MainContainer">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="form.ControlOrigem">
              <Form.Label>Cidade de origem</Form.Label>
              <Form.Control as="select" onChange={this.onChangeOrigem} required={true} ref="origem">
                {this.state.origens.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="form.ControlDestino">
              <Form.Label>Cidade de origem</Form.Label>
              <Form.Control name='destinoEscolhido' as="select" required={true} onChange={this.onChangeEscolhido}>
                {this.state.destinos.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="form.ControlTempo">
              <Form.Label>Tempo de ligação</Form.Label>
              <Form.Control
                name='tempo'
                type="number"
                min="0"
                step="1"
                placeholder="Tempo em minutos..."
                required={true}
                value={this.state.tempo}
                onChange={this.onChangeEscolhido}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="form.ControlPlano">
              <Form.Label>Plano Fale Mais</Form.Label>
              <Form.Control name='planoEscolhido' as="select" required={true} onChange={this.onChangeEscolhido}>
                { this.state.planos.map( ( option, index ) => {
                  return (
                    <option key={ index } value={ option.minutos }>
                      { option.plano}
                    </option>
                  );
                } ) }
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={this.calculate}>
                Calcular
              </Button>
            </Col>
          </Row>
        </Form>
        <br/>
        <Row>
          <Col>
            <h5>Com Fale Mais</h5>
            <h6>R$ {this.state.valorComFaleMais}</h6>
          </Col>
          <Col>
            <h5>Sem Fale Mais</h5>
            <h6>R$ {this.state.valorSemFaleMais}</h6>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Formulario;