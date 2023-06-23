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
        <Row>
          <Col xs={12} className="px-0">
            <Navbar bg="light">
              <Container>
                <Navbar.Brand href="/">
                  <img alt="Logo Oiti" />
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Container>
          <Liveness3D />
          {/* <Router>
            <Switch> */}
          {/*
            <Route element={<Liveness2D />} path="/liveness-2d" />
            <Route element={<Liveness3D />} path="/liveness-3d" />
            <Route element={<SendDocuments />} path="/send-documents" />
          */}
          {/* <Route element={<Liveness3D />} path="/liveness-3d" />
              <Route path="/send-documents" />
            </Switch>
          </Router> */}
        </Container>
      </Container>
    );
  }
}

export default FaceTec;
