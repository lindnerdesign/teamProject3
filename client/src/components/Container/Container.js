import React from "react";
import "./Container.css";

const Container = props =>
  <div className={`container${props.fluid ? "-fluid" : ""}`} {...props} />;

export default Container;
