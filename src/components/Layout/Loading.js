import React, {Component} from "react";
import {DotScale} from "styled-loaders-react";

export default class Loading extends Component {
  render() {
    return (
      <div className="" style={{minHeight: "100vh", marginTop: "0%"}}>
        <DotScale color="rgba(69, 35, 73, 0.9)" size="100px" duration="5s" />
      </div>
    );
  }
}
