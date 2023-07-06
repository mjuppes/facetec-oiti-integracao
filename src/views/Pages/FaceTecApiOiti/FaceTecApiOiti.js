import React, { Component } from 'react';
import { Col, Row, Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";
import {isMobile} from 'react-device-detect';
//import FaceTec from '../FaceTec/FaceTec';
import Spinner from '../../Spinner';

import { Liveness3D } from "../FaceTec/liveness-3d";

class FaceTecApiOiti extends Component {
    constructor(props) {
      super(props);

      
      this.state = {
        imagem : '',
        id_unico: false,
        id_tabela_unico: '',
        access_token: '',
        loadSpinner: false,
        tipoDocumento: '',
        showCamera: true,
        errorUnico: false,
        keyComponente : 0
      };
  
    }


    getImagemOiti = (imagem, success) => {
      this.setState({ imagem : 'data:image/jpeg;base64,' + imagem, sucessOiti : success, showCamera : false}); //retirar comentario
    }




    render() {
      const containerStyle = {
          "width": "400px",
          "height": "600px",
      };

      const tamanhoImgMobile = {
        'width' : '75%'
      }
      
      const tamanhoImgDesk = {
        'width' : '100%'
      }

      const containerStyleSpinner = {
        'margin-top' : '50%',
      };

      return (
            <div>
                {this.state.loadSpinner  === true &&
                  <div>
                    <div style={containerStyleSpinner}>
                      <Spinner 
                        mensagem = {this.state.mensagem}
                      />
                    </div>
                  </div>
                }

                
                {(this.state.showCamera  ===  true) &&
                  <div style={containerStyle}>
                      <Liveness3D 
                        nome ={this.props.nome}
                        cpf  = {this.props.cpf}
                        nascimento = {this.props.nascimento}
                        idExternoCliente = {this.props.codigoAF}
                        getImagemOiti = {this.getImagemOiti}
                        showMessageErrorOiti = {this.showMessageErrorOiti}
                        key = {this.state.keyComponente}
                      />
                  </div>
                }


                {(this.state.errorProcessoOiti  === true) &&
                      <Card className="border-white shadow" style={{borderRadius: '8px'}}>
                        <CardBody>
                          <Row className="mt-3">
                                <Col xs="12" sm="12">
                                  <p>{this.state.msgErroUnico}</p>
                                  <p><i className="fa fa-meh-o fa-lg h1 text-danger"></i></p>
                                </Col>
                          </Row>
                          <Row>
                              <Col className="text-center" md="12" lg="12" xl="12" xs="12" sm="12">
                                <Link className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2"
                                  onClick={() => this.props.voltarInicioUnicoSelfie(this.props.tentativaUnico)}
                                  to="#">
                                  Retornar o processo
                                </Link>
                              </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    }

                    {(this.state.sucessOiti === true) &&
                      <Card className="border-white shadow" style={{borderRadius: '8px'}}>
                        <CardBody>
                          <Row className="mt-3">
                            <Col>
                              <h5>Muito bem! Veja abaixo a foto.</h5>
                            </Col>
                            <Col xs="12" sm="12" md="12">
                              <img src={ this.state.imagem } alt="Selfie" style={ isMobile === true ? tamanhoImgMobile : tamanhoImgDesk} />
                            </Col>
                            <Col className="text-center" md="12" lg="12" xs="12" sm="12">
                                <Link className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2"
                                  onClick={() => this.props.getStateSelfieOiti(this.state.imagem)}
                                  to="#">
                                  Ir para próxima etapa
                                </Link>
                            </Col>
                          </Row> 
                        </CardBody>
                      </Card>
                    }
             </div>
      );
  }
}

export default FaceTecApiOiti;