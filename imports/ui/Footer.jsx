import React, { Component } from "react";

let style = {
  borderTop: "1px solid #E7E7E7",
  marginTop: "30px",
  textAlign: "right",
  padding: "20px",
  width: "auto",
  left: "0",
  bottom: "0",
  height: "100px",
  fontFamily:"Mountains of Christmas",
  fontSize:"25px",
  color:"white"
};

export default class Footer extends Component {
  render() {
    return <footer style={style}> <span>♥️</span> by MengBanana & YHuangxu <span>♥️</span></footer>;
  }
}