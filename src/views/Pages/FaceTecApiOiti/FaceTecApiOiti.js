import React, { Component } from 'react';
import { Col, Row, Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";
import {isMobile} from 'react-device-detect';
import FaceTec from '../FaceTec/FaceTec';
import CardCIM from '../EnvioDocumentoUnicoCIM/CardCIM';

class FaceTecApiOiti extends Component {
    constructor(props) {
      super(props);

  
    }

    render() {

        return (
          <div>
            <FaceTec />
          </div>            
        );
    }
}

export default FaceTecApiOiti;