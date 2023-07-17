import React, { Component } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
/*import { Liveness2D } from './liveness-2d';*/
import { Liveness3D } from "./liveness-3d";
/*
import { SendDocuments } from './send-documents';
*/
class FaceTec extends Component {
  render() {
    return (
      <Container fluid className="p-0">
        <Container>
          <Liveness3D />
        </Container>
      </Container>
    );
  }
}

export default FaceTec;
  