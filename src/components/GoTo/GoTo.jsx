import React from "react";
import "./GoTo.css";

export default function GoTo({ texto }) {
  return (
    <button className="learn-more">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">{texto}</span>
    </button>
  );
}
