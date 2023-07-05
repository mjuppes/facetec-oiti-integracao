import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FacetecLogo from '../assets/img/FaceTec_Logo.png';
import { SampleApp } from './sample-app';

class Liveness3D extends Component {
  

  componentDidMount() {
    SampleApp.getProductionKey();
  }

  render() {

  return (
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
  );
  }
}

export default Liveness3D;