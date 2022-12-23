import React from "react";
import GoTo from "../../components/GoTo/GoTo";
import "./favoritos.css";
import "../Inicio/inicio.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CardCarrito from "../../components/CardCarrito/CardCarrito";
import CardFavoritos from "../../components/CardFavoritos/CardFavoritos";

export default function Favoritos() {
  let { favoritos, token, logged } = useSelector((store) => store.userReducer);

  return (
    <>
      <div className="mainFavoritos">
        <div className="divInicio">
          <h2>
            TUS FAVORITOS <span className="blanco">.</span>
          </h2>
          <p className="parrafoInicio">
            En esta seccion podes ver todos los productos que te gustaron y los
            fuiste agregando a tus favoritos, analizalos y decide
          </p>

          <a href="#productos" className="buttonInicio">
            <GoTo texto="FAVORITOS" />
          </a>
        </div>
      </div>
      <h2 style={{ textAlign: "center", marginTop: 25 }}>
        TUS PRODUCTOS FAVORITOS <span className="blanco">.</span>
      </h2>

      {!logged ? (
        <div
          className="containerCardsFavoritos"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="sinarticulosencarro">
            <h3>Ingresá para ver tus favoritos</h3>
            <NavLink className="botonIrAproductos" to="/ingresar">
              Ingresar
            </NavLink>
          </div>
        </div>
      ) : favoritos.length === 0 ? (
        <div
          className="containerCardsFavoritos"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="sinarticulosencarro">
            <h3>No tienes productos seleccionados</h3>
            <NavLink className="botonIrAproductos" to="/productos">
              Investigar los productos disponibles
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="containerCardsFavoritos">
          {favoritos.map((x) => (
            <CardFavoritos producto={x} key={x._id} />
          ))}
        </div>
      )}

      
    </>
  );
}
