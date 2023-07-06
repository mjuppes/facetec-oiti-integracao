import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FacetecLogo from "../assets/img/FaceTec_Logo.png";
import { SampleApp } from "./sample-app";

import axios from "axios";
class Liveness3D extends Component {
  async componentDidMount() {
    SampleApp.getProductionKey();

    SampleApp.settCallback(
      async (appkey) => {
        const FormData = require("form-data");
        const formData = new FormData();
        formData.append("appkey", appkey);

        await axios
          .post(
            "https://app.factafinanceira.com.br/IntegracaoOiti/getResult",
            formData
          )
          .then(async (response) => {
            console.log("teste chegou aqui ");
            //console.log(response.data.)
          })
          .catch((error) => {
            console.log(error);
            console.log("error", error + " teste agora");
          });
      },
      (type, error) => {
        if (window.confirm(error)) {
          SampleApp.renewProductionKey();
        }
      }
    );
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
