import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import API from "../../config/api";
import productsActions from "../../redux/actions/productsActions";
import "./success.css";

export default function Success() {
  const { editarProducto } = productsActions;

  let token = JSON.parse(localStorage.getItem("token"));
  token = token.token.user;

  const dispatch = useDispatch();

  let usuario = async () => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    let a = await axios.get(`${API}auth/me`, headers);

    let precioTotal = a.data.response.products
      .map((x) => x.productId.price * x.quantity)
      .reduce(function (valorAnterior, valorActual) {
        return valorAnterior + valorActual;
      });

    a.data.response.products.map((x) => {
      let producto = {
        stock: x.productId.stock - x.quantity,
      };
      dispatch(editarProducto({ token, producto, id: x.productId._id }));
    });

    let data = {
      coins: a.data.response.aprove
        ? 0
        : a.data.response.coins + Math.round(precioTotal * 0.02),
      aprove: false,
      products: [],
    };
    
    await axios.patch(`${API}auth/me`, data, headers);
  };

  useEffect(() => {
    usuario();
  }, []);

  return (
    <div className="Ingreso">
      <img
        className="shoppyLogoRegistro"
        src="https://cdn.discordapp.com/attachments/830354293822324736/1051744433550397510/Sin_titulo-2.png"
        alt="logo_shoppy"
      />

      <div className="edFormSuccess">
        <h2>
          PAGO REALIZADO CON ÉXITO<span className="blanco">.</span>
        </h2>
        <h4>Muchas gracias por confiar en nosotros</h4>
        {/* <p className="botonAceptarVolver">

            VOLVER
            
        </p> */}
      </div>
      <div className="edFotoSuccess"></div>
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
