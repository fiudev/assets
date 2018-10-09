import React from "react";

export default function Header(props) {
  return (
    <div className="header">
      {props.text && <h4>{props.text}</h4>}
      {props.children}
    </div>
  );
}
