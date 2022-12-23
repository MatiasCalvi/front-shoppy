import React from "react";
import "./cardadministrador.css";

export default function CardAdministrador({ producto }) {
  return (
    <div className="cardProductosAdministrador">
      <img src={producto.photo} alt={producto._id} />
      <div>
        
      </div>
      <div>

      </div>
      <div className="infoProductosAdministrador">
        <p>
          <span className="negrita99">Nombre:</span> {producto.name}
        </p>
        <p>
          <span className="negrita99">Categoria:</span> {producto.category}
        </p>
        <p>
          <span className="negrita99">Marca:</span> {producto.brand}
        </p>
        <p>
          <span className="negrita99">Stock: </span>
          {producto.stock < 5 ? (
            <span className="rojo99">{producto.stock}</span>
          ) : (
            <span>{producto.stock}</span>
          )}
        </p>
      </div>
    </div>
  );
}
