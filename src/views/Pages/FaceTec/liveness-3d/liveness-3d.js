import React, { Component } from 'react';
import { Col, Row, Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import FacetecLogo from '../assets/img/FaceTec_Logo.png';
import { SampleApp } from './sample-app';

import axios from "axios";
class Liveness3D extends Component {
  

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      msgerro : '',
      type : ''
    };

  }

  async componentDidMount() {
    SampleApp.getProductionKey(this.props.nome, this.props.cpf, this.props.nascimento, this.props.idExternoCliente);
    
    SampleApp.settCallback(
      async (appkey) => {
        const FormData = require("form-data");
        const formData = new FormData();
        formData.append('appkey', appkey);

        await axios.post("https://app.factafinanceira.com.br/IntegracaoOiti/getResult",
          formData).then(async(response) => {
            this.props.getImagemOiti(response.data.imagem, true);
          })
          .catch((error) => {
            console.log(error);
            console.log("error", error + " teste agora");
          });
    }, (type, msgErroOiti)  => {

      this.setState({errorOiti : true, msgErroOiti : msgErroOiti,  modalDados : true, type : type});

    });
  }

  toggleMdlDados = () => {
    (this.state.modalDados === false) ? this.setState({modalDados: true}) : this.setState({modalDados: false});
    this.setState({errorOiti : false});
      SampleApp.renewProductionKey(this.props.nome, this.props.cpf, this.props.nascimento, this.props.idExternoCliente);
  }
  
  render() {

    const btn100 = {
      'width' : '100%'
    }

    const colunaBtn = {
      'margin-bottom': '10px'
    }

    return (
  <div>
 
        {(this.state.errorOiti === true) &&
                  <Col xs="12">
                    <Modal isOpen={this.state.modalDados} toggle={this.modalDados} className='modal-primary modal-dialog-centered' style={{'zIndex' : 9999}}>
                        <ModalHeader toggle={this.toggleMdlDados} onClick={this.props.onClick}>Atenção</ModalHeader>
                        <ModalBody>
                          <Row className="mt-1">
                            <Col md="2" lg="2" xl="2" xs="2" sm="2" className="d-flex justify-content-center">
                              <i className="fa fa-times-circle-o align-self-center h2"></i>
                            </Col>
                            <Col md="10" lg="10" xl="10" xs="10" sm="10" className="text-left pl-0">
                              <p className="align-self-center">{this.state.msgErroOiti}!!</p>
                            </Col>
                          </Row>
                          {(this.state.type === 'NOTCONFIRMED') &&
                          <Row className="mt-1">
                              <Col md="12" lg="12" xl="12" xs="12" sm="12" className="text-center" style={colunaBtn}>
                                <Button type="submit" color="primary" style={btn100}
                                onClick={() =>this.toggleMdlDados() } >Tentar Novamente</Button>
                              </Col>
                              <Col md="12" lg="12" xl="12" xs="12" sm="12" className="text-center">
                                <Button color="secondary" style={btn100} onClick={() => window.location.reload()}>Sair</Button>
                              </Col>
                          </Row>
                          }
                          {(this.state.type === 'FATALERROR') &&
                            <Row className="mt-1">
                              <Col md="12" lg="12" xl="12" xs="12" sm="12" className="text-center">
                                <Button color="success" onClick={() => window.location.reload()}>Ok</Button>
                              </Col>
                            </Row>
                          }

                        </ModalBody>
                      </Modal>
                  </Col>
        }

        <Row>
  
        <Col xs={12} className="my-4">
          <div className="wrapping-box-container">
            <div id="controls" className="controls">
            
              <p id="status" className="mt-2">
                {SampleApp.status} 
              </p> 

              
            </div>
          </div>
        </Col>
      </Row>
    
    </div>
  );
  }
}

export default Liveness3D;
