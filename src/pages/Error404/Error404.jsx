import React from "react";
import { NavLink } from "react-router-dom";
import GoTo from "../../components/GoTo/GoTo";
import "./error404.css";

export default function Error404() {
  return (
    <>
      <div className="mainError">
        <div className="divError">
          <h2>
            PAGINA NO ENCONTRADA<span className="blanco">.</span>
          </h2>
          <p className="parrafoError">
            Hola, todavia no contamos con esta seccion, nos disculpamos desde el
            equipo de shoppy. Ante cualquier consulta puedes mandarnos un correo
            y te la responderemos a la brevedad
          </p>
          <NavLink to={`/`} style={{ textDecoration: "none" }}>
            <GoTo texto="VOLVER"></GoTo>
          </NavLink>
        </div>
      </div>
    </>
  );
}
