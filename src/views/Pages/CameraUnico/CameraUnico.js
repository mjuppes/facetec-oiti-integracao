import { drawContour } from 'face-api.js/build/commonjs/draw';
import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder,DocumentCameraTypes } from "unico-webframe";
import Spinner from '../../Spinner';


class CameraUnico extends Component {

    constructor(props) {
      super(props);

      this.state = {
        loadSpinner: false,
        cameraPromised : '',
      }
    }

    showMessageErrorUnicoModal = (message, cameraPromised) => {
      this.setState({errorUnico : true, modalDados : true, msgErroUnico : message, cameraPromised : cameraPromised, mensagem : '', loadSpinner : false});
    }

    preparedCameraLoad = (cameraPromised) => {
      let showMessageErrorUnico = this.props.showMessageErrorUnico.bind(this);
      let showMessageErrorUnicoModal = this.showMessageErrorUnicoModal.bind(this);
      this.setState({errorUnico : false});

      let callback = "";

      console.log('this.props.tipoDocumento')
      console.log(this.props.tipoDocumento);

      if(this.props.tipoDocumento === 'SELFIE') {
            this.setState({ loadSpinner: true, mensagem: 'Carregando aguarde...' });

            let getImagemUnico = this.props.getImagemUnico.bind(this);

            callback = {
              on: {
                success: function(result) {
                  getImagemUnico(result, cameraPromised);
                },
                error: function(error) {
                  showMessageErrorUnicoModal('Erro ao tirar Selfie verifique seu dispositivo!!', cameraPromised);
                }
              }
            }

          const timeoutMs = 60000; // Defina o tempo limite em milissegundos (por exemplo, 10 segundos)

          // Inicie o tempo limite com setTimeout
          const timeoutId = setTimeout(() => {
            showMessageErrorUnicoModal('Tempo limite excedido tente novamente daqui a alguns minutos.', cameraPromised);
          }, timeoutMs);


            cameraPromised.then(cameraOpener => {
              // Limpe o tempo limite se a câmera estiver pronta antes do tempo limite expirar
              clearTimeout(timeoutId);
            
              // A câmera está pronta, você pode abri-la aqui
              cameraOpener.open(callback);
            })
            .catch(error => {
              // Trate outros erros aqui, se houver algum
              showMessageErrorUnico('Erro ao preparar a câmera.', cameraPromised);
            });

      } else {
            let setDocumentoUnico = this.props.setDocumentoUnico.bind(this);

            callback = {
              on: {
                success: function(result) {
                  setDocumentoUnico(result.base64, cameraPromised);
                },
                error: function(error) {
                  showMessageErrorUnicoModal(error.message+"!", cameraPromised);
                }
              }
            }

            cameraPromised.then(cameraOpener => cameraOpener.open(callback));
      }
    }

  

    componentDidMount() {
      const unicoCameraBuilder = new UnicoCheckBuilder();
      const public_url  = process.env.PUBLIC_URL;

      unicoCameraBuilder.setResourceDirectory(public_url + "/resources");


      const unicoTheme = new UnicoThemeBuilder().setColorSilhouetteSuccess("#0384fc")
      .setColorSilhouetteError("#D50000").setColorSilhouetteNeutral("#fcfcfc")
      .setBackgroundColor("#dff1f5").setColorText("#0384fc").setBackgroundColorComponents("#0384fc")
      .setColorTextComponents("#dff1f5").setBackgroundColorButtons("#0384fc").setColorTextButtons("#dff1f5")
      .setBackgroundColorBoxMessage("#fff").setColorTextBoxMessage("#000")
      .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`).build();

      unicoCameraBuilder.setTheme(unicoTheme);

      const url = window.location.protocol + "//" + window.location.host + public_url + "/models";
      unicoCameraBuilder.setModelsPath(url);

      const unicoCamera = unicoCameraBuilder.build();

      let cameraPromised = "";
      //alert(this.props.cameraPromised);

      if(this.props.cameraPromised === '') {
         const tipoDocumentoMappings = {
            SELFIE: SelfieCameraTypes.SMART,
            CNH: DocumentCameraTypes.CNH,
            FRENTE: DocumentCameraTypes.RG_FRENTE,
            VERSO: DocumentCameraTypes.RG_VERSO,
            FRENTE_NOVO: DocumentCameraTypes.RG_FRENTE_NOVO,
            VERSO_NOVO: DocumentCameraTypes.RG_VERSO_NOVO,
            CTPS_FRENTE: DocumentCameraTypes.OTHERS("CARTEIRA DE TRABALHO FRENTE"),
            CTPS_VERSO: DocumentCameraTypes.OTHERS("CARTEIRA DE TRABALHO VERSO"),
            EXTRATO: DocumentCameraTypes.OTHERS("EXTRATO"),
            COMPRENDA: DocumentCameraTypes.OTHERS("COMPROVANTE DE RENDA"),
            COMPRESID: DocumentCameraTypes.OTHERS("COMPROVANTE DE RESIDÊNCIA"),
            CADOPTANTE: DocumentCameraTypes.OTHERS("CADASTRO OPTANTE"),
            CONTRACHEQUE: DocumentCameraTypes.OTHERS("CONTRA CHEQUE"),
            RNE_FRENTE: DocumentCameraTypes.OTHERS("RNE FRENTE"),
            RNE_VERSO: DocumentCameraTypes.OTHERS("RNE VERSO"),
            CIM_FRENTE: DocumentCameraTypes.OTHERS("CARTEIRA DE IDENTIDADE MILITAR FRENTE"),
            CIM_VERSO: DocumentCameraTypes.OTHERS("CARTEIRA DE IDENTIDADE MILITAR VERSO"),
        };

        const cameraType = tipoDocumentoMappings[this.props.tipoDocumento] || null ;
        cameraPromised =  unicoCamera.prepareSelfieCamera(public_url + "/services.json",cameraType);
      } else {
        cameraPromised = this.props.cameraPromised;
      }

      this.preparedCameraLoad(cameraPromised);
    }


    render() {
      const containerStyle = {
        "width": "400px",
        "height": "600px",
    };

    const containerStyleSpinner = {
      'margin-top' : '50%',
    };

    return (
      <div>
        {this.state.loadSpinner  === true &&
          <div style={containerStyleSpinner}>
            <Spinner 
            mensagem = {this.state.mensagem}
            />
          </div>
        }

        {this.state.errorUnico === true &&
          <Col xs="12">
            <Modal isOpen={this.state.modalDados} toggle={this.modalDados} className='modal-primary modal-dialog-centered' style={{'zIndex' : 9999}}>
                <ModalHeader toggle={this.toggleMdlDados} onClick={this.props.onClick}>Atenção</ModalHeader>
                <ModalBody>
                  <Row className="mt-1">
                    <Col md="2" lg="2" xl="2" xs="2" sm="2" className="d-flex justify-content-center">
                      <i className="fa fa-times-circle-o align-self-center h2"></i>
                    </Col>
                    <Col md="10" lg="10" xl="10" xs="10" sm="10" className="text-left pl-0">
                      <p className="align-self-center">{this.state.msgErroUnico}</p>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col md="12" lg="12" xl="12" xs="12" sm="12" className="text-center">
                      <Button color="success" onClick={() => this.preparedCameraLoad(this.state.cameraPromised)}>Clique Aqui</Button>
                    </Col>                                    
                  </Row>
                </ModalBody>
              </Modal>
          </Col>
        }

        <div style={containerStyle}>
            <div id="box-camera"></div>
        </div>
      </div>
    );
  }
}

export default CameraUnico;