import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/ClearOutlined";
import "primeicons/primeicons.css";
import "../CardCarrito/cardcarrito.css";
import userActions from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./cardfavoritos.css"
import funciones from "../../config/funciones";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


const { separator } = funciones;

export default function CardFavoritos({ producto }) {

  let { favoritos, token } =
    useSelector((store) => store.userReducer);
  const {agregarAfavoritos} = userActions

  const {separator} = funciones
  const dispatch = useDispatch()

  const eliminarDeFavoritos = () => {

    let nuevosFavoritos = favoritos.filter((x) => x._id !== producto._id);
    dispatch(agregarAfavoritos({ token: token, favoritos: nuevosFavoritos }));
    toast.success(
      `Se elimino ${producto?.category} ${producto?.brand} ${producto?.name} de favoritos`,
      {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );


  }


  return (
    <div className="cardFavoritos">
      <div className="FotocardFavoritos">
        <img src={producto?.photo} alt={producto?._id} />
      </div>
      <div className="infoCardCarrito">
        <h5 className="nombreEnFavorito">{producto?.name}<span className="blanco">.</span></h5>

        <hr className="hr" />
        <h5>
          {producto?.category} {producto?.brand}
        </h5>
        <h5 className="nombreEnFavorito">$ {separator(producto?.price)}</h5>
        <hr className="hr" />
        <div className="preciosFavoritos">
          <div className="botonIrAdetallesFavoritos" onClick={eliminarDeFavoritos}>ELIMINAR</div>
          <NavLink
            className="botonIrAdetallesFavoritos"
            to={`/detalle-producto/${producto._id}`}
          >
            VER DETALLES
          </NavLink>
        </div>
      </div>
    </div>
  );
}
