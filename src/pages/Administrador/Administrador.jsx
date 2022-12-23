import React from "react";
import GoTo from "../../components/GoTo/GoTo";
import TablaAdministrador from "../../components/TablaAdministrador/TablaAdministrador";
import "./administrador.css";

export default function Administrador() {
  return (
    <div>
      <div className="mainAdmin">
        <div className="divInicio">
          <h2>
            PERFIL ADMINISTRADOR<span className="blanco">.</span>
          </h2>

          <a href="#admin" className="buttonInicio">
           {/*  <GoTo texto="ADMINISTRAR" /> */}
          </a>
        </div>
      </div>
      <div id="admin" className="TablaAdmin">
        <TablaAdministrador />
      </div>
    </div>
  );
}
