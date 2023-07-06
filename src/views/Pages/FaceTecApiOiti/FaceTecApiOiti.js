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
        errorUnico: false
      };
  
    }


    getImagemOiti = (imagem) => {
      this.setState({ imagem : 'data:image/jpeg;base64,' + imagem.base64, encrypted : imagem.encrypted}); //retirar comentario
      //this.handleCredencial();
    }


    /*render() {

        return (
          <div>
            <FaceTec />
          </div>            
        );
    }*/


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
                        getImagemOiti = {this.getImagemOiti}
                      />
                  </div>
                }

                {(this.state.errorUnico === true) &&
                  <Col xs="12">
                    <Modal isOpen={this.state.modalDados} toggle={this.modalDados} className='modal-primary modal-dialog-centered' style={{'zIndex' : 9999}}>
                        <ModalHeader toggle={this.toggleMdlDados} onClick={this.props.onClick}>Atenção</ModalHeader>
                        <ModalBody>
                          <Row className="mt-1">
                            <Col md="2" lg="2" xl="2" xs="2" sm="2" className="d-flex justify-content-center">
                              <i className="fa fa-times-circle-o align-self-center h2"></i>
                            </Col>
                            <Col md="10" lg="10" xl="10" xs="10" sm="10" className="text-left pl-0">
                              <p className="align-self-center">{this.state.msgErroUnico}!!</p>
                            </Col>
                          </Row>
                          <Row className="mt-1">
                            <Col md="12" lg="12" xl="12" xs="12" sm="12" className="text-center">
                              <Button color="success" onClick={this.props.onClick}>Ok</Button>
                            </Col>
                          </Row>
                        </ModalBody>
                      </Modal>
                  </Col>
                }

                {(this.state.errorProcessoUnico  === true) &&
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

                    {(this.state.sucessUnico == true) &&
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
                                  onClick={() => this.props.getStateSelfie(this.state.access_token, this.state.id_unico, this.state.imagem, this.state.id_tabela_unico)}
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