import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import data from "./data/data.json";

const TARIFAS = data.tarifas;
const PLANOS  = data.planos;

class App extends Component {
  constructor(props) {
    super(props);
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
    
    let origens  = [];
    let planos   = [];
    let destinos = [];

    TARIFAS.forEach(tarifa => {
      if (origens.indexOf(tarifa.origem) === -1) 
        origens.push(tarifa.origem);
    });

    PLANOS.forEach(plano => {
      if (planos.indexOf(plano.plano) === -1) 
        planos.push(plano.plano);
    });

    destinos = this.calculateDestino(origens[0]);

    this.setState({
      origens         : origens,
      origemEscolhida : origens[0],
      destinos        : destinos,
      destinoEscolhido: destinos[0],
      planos          : planos,
      planoEscolhido  : planos[0]
    });
  }

  calculateDestino(origem){

    let destinos = [];
    
    TARIFAS.forEach(tarifa => {
      
      if ( tarifa.origem === origem && destinos.indexOf(tarifa.destino) === -1 )
        destinos.push(tarifa.destino);
    
    });

    return destinos;
  }

  getTarifa(origem, destino){

    let valor = 0;
    
    TARIFAS.forEach(tarifa => {
      if ( tarifa.origem === origem && tarifa.destino === destino ){
        valor = tarifa.valor;
        return
      }
    });

    return valor;
  }

  getMinutosPlano( planoEscolhido ){

    let minutos = 0;

    PLANOS.forEach(plano => {
      if ( plano.plano === planoEscolhido )
        minutos = plano.minutos;
        return
    });

    return minutos;

  }

  onChangeOrigem( event ) {

    let origem   = event.target.value;
    let destinos = this.calculateDestino(origem);
    
    this.setState({
      origemEscolhida : origem,
      destinos        : destinos,
      destinoEscolhido: destinos[0]
    });
  }

  onChangeEscolhido( event ){
    this.setState({ [event.target.name]: event.target.value });
  }

  calculate( event ){
    let minutosPlano = this.getMinutosPlano( this.state.planoEscolhido );
    let tempo        = this.state.tempo;
    let tarifa       = this.getTarifa(this.state.origemEscolhida, this.state.destinoEscolhido);
console.log(minutosPlano)
    this.setState({
      valorComFaleMais : minutosPlano >= tempo ? 0 : ( tempo - minutosPlano ) * tarifa,
      valorSemFaleMais : tempo * tarifa
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
                    <option key={ index } value={ option }>
                      { option }
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

export default App;
