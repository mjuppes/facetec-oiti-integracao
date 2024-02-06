import React, { Component } from 'react';
import { Col, Row, Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import Spinner from '../../Spinner';
import CameraUnico from '../CameraUnico/CameraUnico';

import axios from 'axios';
import { isJSXOpeningFragment } from '@babel/types';

const URL_API = 'https://app.factafinanceira.com.br/api3';
class EnvioDocumentoUnicoCIM extends Component {
    constructor(props) {
      super(props);

      this.state = {
        imagem : '',
        errorUnico: '',
        showCamera: true,
        modalDados: false,
        loadSpinner: false,
        msgErroUnico: '',
        sucessUnico: false,
        id_unico:  this.props.id_unico,
        access_token: this.props.access_token,
        tentativaUnico : this.props.tentativaUnico,
        proximoLink: '',
        mensagem : "Aguarde enviando documentos...",
        liveness : '',
        ocrcode : '',
        codigoAF : this.props.codigoAF,
        errorProcessoUnico: false,
        tipoCTPS : this.props.ctps,
        tipoCIM : this.props.CIM,
        scoreReprovado: false,
        isOcr: false,
        isOiti: false,
        labelBtn: '',
        isEncerrar: false,
        responseScore: false,
        responseProcess: false,
        retProcesso: false,
        isScoreExcep: false,
        cameraPromised : ''
      };

    }


showMessageErrorUnico = (message) => {
  this.setState({showCamera: false, errorUnico:  true, modalDados : true, msgErroUnico: message});
}

setDocumentoUnico = async (imagem, cameraPromised) => {
  this.setState({loadSpinner : true,  imagem : imagem, showCamera : false, cameraPromised : cameraPromised });

  if (this.props.CIM == 'CIM_VERSO') {

    let retScore = await this.buscaScoreUnico(this.props.codigoAF, this.props.id_unico);

  } else {
      this.setState({loadSpinner : false, sucessUnico : true});
  }
}

getDocumentosUnico =  (id_unico, access_token) => {
  const FormData = require('form-data');
  const formData = new FormData();
  formData.append('id_unico', id_unico);
  formData.append('token', access_token);

  this.setState({ mensagem : 'Finalizando...' });

  axios.post(
    URL_API + "/get_documentos_unico",
    formData).then((response) => {
      console.log('Get processo');
      console.log(response);

      this.setState({loadSpinner : false, sucessUnico : true});
      this.props.checkedFoto();
  })
  .catch((error) => {
      console.log('error', error);
  });
}

toggleMdlDados = () => {
  (this.state.modalDados === false) ? this.setState({modalDados: true}) : this.setState({modalDados: false}); 
}

buscaScoreUnico = async (codigoAF, id_unico) => {
  const FormData = require('form-data');
  const formData = new FormData();

  formData.append('codigoAF', codigoAF);
  formData.append('id_unico', id_unico);

  await axios.post(
  URL_API + "/get_score_unico",
  formData).then((response) => {
          if (parseInt(this.props.averbador) === 390 && parseInt(this.props.tipoOperacao) === 14 && response.data.score < 0) { //REGRA REFINS LOJAS
              this.setState({
                loadSpinner: false,
                sucessUnico: true,
                etapaFinalizar: true,
                isScoreExcep: true
              });

              this.props.checkedFoto();
              this.state.responseScore = true;
        } else {
          if(response.data.score == 0) {
              this.setState({
                  loadSpinner: false,
                  mensagem: '',
                  errorProcessoUnico: true,
                  msgErroUnico : 'Houve erro ao processar Selfie e Documento, por favor enviar novamente!', 
                  sucessUnico: false
                });
          } else {
            if (response.data.score < -1) { //REPROVA DIRETO
              this.setState({isEncerrar : true, labelBtn: 'Confirmar a assinatura'});
            }

            if (response.data.score == 10) { //ENVIA PARA OITI
                this.state.isOiti = true;
            }

            this.setState({
              loadSpinner: false,
              sucessUnico: true,
              etapaFinalizar: true
            });

            this.state.responseScore = true;
            this.props.checkedFoto();
        }
        
    }
  })
  .catch((error) => {
      console.log('error', error);
  });

  console.log('Aguardando processo 3...')
  return this.state.responseScore;
}


removeDoc = () => {
  this.setState({errorUnico : false, showCamera : true, errorOCR : false, sucessUnico : false})
}

render() {
        const containerStyle = {
            "width": "400px",
            "height": "600px",
        };

        const containerStyleSpinner = {
          'margin-top' : '50%',
        };

        
        const tamanhoImgMobile = {
          'width' : '75%'
        }
        
        const tamanhoImgDesk = {
          'width' : '100%'
        }

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
                      <CameraUnico
                      tipoDocumento = {this.props.CIM}
                      showMessageErrorUnico = {this.showMessageErrorUnico}
                      setDocumentoUnico = {this.setDocumentoUnico}
                      cameraPromised = {this.state.cameraPromised}
                    />
                  }

                  {(this.state.errorUnico  === true) &&
                    <Col xs="12">
                      <Modal isOpen={this.state.modalDados} toggle={this.modalDados} className='modal-primary modal-dialog-centered' style={{'zIndex' : 9999}}>
                          <ModalHeader toggle={this.toggleMdlDados} onClick={() => this.removeDoc()}>Atenção</ModalHeader>
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
                                <Button color="success" onClick={() => this.removeDoc()}>Ok</Button>
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
                                onClick={() => this.props.voltarInicioUnicoSelfie(this.state.tentativaUnico)}
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
                            <img src={ this.state.imagem } alt="Selfie"  style={ isMobile === true ? tamanhoImgMobile : tamanhoImgDesk} />
                          </Col>
                        </Row>
                        <Row>
                                
                              {(this.props.etapaFinalizar === false) &&
                              
                              <Col className="text-center" md="12" lg="12" xl="12" xs="12" sm="12">
                                  <Button className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2" color="outline-danger" 
                                    onClick={() => this.removeDoc()}><i className="fa fa-trash"></i> 
                                      Remover
                                  </Button>

                                  <Link className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2"
                                    onClick={() => this.props.getStatusDocumento(this.state.tipoCIM, this.state.imagem)}
                                    to="#">
                                    Ir para próxima etapa
                                  </Link>
                              </Col>
                              
                              }


                              {(this.props.etapaFinalizar === true) &&
                                  <Col className="text-center" md="12" lg="12" xl="12" xs="12" sm="12">
                                    <Button className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2" color="outline-danger" 
                                        onClick={() => this.removeDoc()}><i className="fa fa-trash"></i> 
                                    Remover
                                    </Button>

                                    <Link className="btn btn-outline-primary btn-block btn-lg font-weight-bold mt-2"
                                      onClick={() => this.props.setEtapaAudioVideo(this.state.tipoCIM, this.state.imagem, false, this.state.isOcr, this.state.isOiti, this.state.isEncerrar, this.state.isScoreExcep)}
                                      to="#">
                                      Ir para a próxima etapa
                                    </Link>
                                  </Col>
                              }
                              
                        </Row>
                      </CardBody>
                    </Card>
                  }

                  {(this.state.scoreReprovado == true) &&
                    <Card className="border-white shadow" style={{borderRadius: '8px'}}>
                      <CardBody>
                        <Row>
                          <Col xs="12" sm="12">
                            <p>Olá <span className="font-weight-bold">{ this.props.nome }</span>!</p>
                            <p>Infelizmente sua proposta foi reprovada!</p>
                            <p><i className="fa fa-meh-o fa-lg h1 text-danger"></i></p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  }
               </div>
        );
    }
}

export default EnvioDocumentoUnicoCIM;