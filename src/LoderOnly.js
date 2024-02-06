import { Component } from 'react';
import axios from 'axios';
class LoaderOnly extends Component {

  constructor(props) {
    super(props);
  }
  
  handleScriptLoad = () => {
    console.log('Script carregado');
  };

  handleScriptError = () => {
    console.log('Erro ao carregar o script');
  };

  getApiBlackBoxes = async () => { 
    const URL_BLACKBOX = 'https://app.factafinanceira.com.br/ProcessoTransUnion/getRetornoBlackbox';

    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('blackbox',this.props.bbBlackBox);
    formData.append('codigoAF',this.props.codigoAF);
    formData.append('averbador',this.props.averbador);
    formData.append('tipo_operacao',this.props.tipo_operacao);

    await axios.post(URL_BLACKBOX, formData).then((response) => {
      console.log(response.data);
      this.props.setLoadBlackBox();
    })
    .catch((error) => {
      console.log(error);
      console.log('error', error);
    });
  }

  getBlackbox = async () => {
    let bb = "";

    try {
      bb = window.IGLOO.getBlackbox();
      this.props.setBlackBox(bb.blackbox);
    } catch (e) {
      this.getBlackbox();
    }
  }

  loadScriptLoader = async () => {
    const script = document.createElement('script');
    script.src = 'https://app.factafinanceira.com.br/v3/LoderOnlyMini.js';
    script.async = true; 
    //script.onload = this.getBlackbox;
    script.onerror = this.handleScriptError;
    document.body.appendChild(script);
    return true;
  }

  async componentDidMount () {

    if(this.props.isBlackbox === true) {
      let ret  = await this.loadScriptLoader();

      setTimeout(async () => {
        if(ret === true){
          await this.getBlackbox();
        }
      }, 1000);
    }
    if(this.props.isApiBlackbox === true) {
      await this.getApiBlackBoxes();
    }
  }

  componentWillUnmount() {
    const script = document.querySelector('script[src="https://app.factafinanceira.com.br/v3/LoderOnlyMini.js"]');
    if (script) {
      document.body.removeChild(script);
    }
  }

  render() {
    return null;
  }
}

export default LoaderOnly;