/* Copyright(c) 2018, iovation, inc. All rights reserved. */
import React, { Component } from 'react';
import LoaderOnly from "./LoaderOnly"


class iGLOO extends Component {


igloo2 = () => {
  window.io_global_object_name = "IGLOO"
  window.IGLOO = window.IGLOO || {
    "enable_flash" : false,
    "bbout_element_id" : "ioBlackBox",  // this can be changed to store in a different hidden field (or removed to use a different collection method)
    "loader" : {
      "subkey"  : "",
      "fp_static" : false,
      "tp_static" : false,
      "version" : "general5"
      }
  };


}

  componentDidMount() {
    this.igloo2()
  }

  render() {
    return (
      <LoaderOnly />
    );
  }
}
export default iGLOO;