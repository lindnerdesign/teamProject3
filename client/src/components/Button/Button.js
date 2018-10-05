import React from "react";

const Button = props => (
  <span className={props.className} style={props.style} {...props}>
    {props.children}
  </span>
);

export default Button;
