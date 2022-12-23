import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GoTo from "../../components/GoTo/GoTo";
import "./fail.css"

export default function Fail() {
  return (
    <div className="Ingreso">
      <img
        className="shoppyLogoRegistro"
        src="https://cdn.discordapp.com/attachments/830354293822324736/1051744433550397510/Sin_titulo-2.png"
        alt="logo_shoppy"
      />

      <div className="edFormFail">
        <h2>
          PAGO FALLIDO<span className="blanco">.</span>
        </h2>
        <h4 >
          Por favor intenta nuevamente
        </h4>
        {/* <p className="botonAceptarVolver">

            VOLVER
            
        </p> */}
      </div>
      <div className="edFotoFail"></div>
      <NavLink to={"/inicio"}>
        <div className="edVolverAInicioRegistro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            color="#f3f3f3"
            fill="currentColor"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
          </svg>
          <p>volver</p>
        </div>
        <ToastContainer />
      </NavLink>
    </div>
  );
}
