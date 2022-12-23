import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/ClearOutlined";
import "primeicons/primeicons.css";
import "./cardcarrito.css";
import userActions from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";

import funciones from "../../config/funciones";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const { separator } = funciones;

export default function CardCarrito({ producto }) {
  const dispatch = useDispatch();

  const { agregarAcarro } = userActions;
  let { carrito, token } = useSelector((store) => store.userReducer);

  let carritoMod = carrito;

 /*  console.log(producto); */

  let [cantidad, setCantidad] = useState(producto.quantity);
  let [precioTotal, setPrecioTotal] = useState(
    producto.productId.price * producto.quantity
  );

  let eliminarProducto = (id) => {
    carrito = carrito.filter((x) => x.productId._id !== id);
    dispatch(agregarAcarro({ token, carrito }));
  };

  const sumar = (id) => {
    if (cantidad < producto.productId.stock) {
      setCantidad(cantidad + 1);
      carritoMod = carritoMod.map((x) => {
        if (x.productId._id === id) {
          let y = {
            ...x,
            quantity: cantidad + 1,
          };
          return y;
        } else {
          return x;
        }
      });

      dispatch(agregarAcarro({ token, carrito: carritoMod }));
    }
  };

  const restar = (id) => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      carritoMod = carritoMod.map((x) => {
        if (x.productId._id === id) {
          let y = {
            ...x,
            quantity: cantidad - 1,
          };
          return y;
        } else {
          return x;
        }
      });

      dispatch(agregarAcarro({ token, carrito: carritoMod }));
    }
  };

  useEffect(() => {
    setPrecioTotal(producto?.productId?.price * cantidad);
  }, [cantidad]);

  useEffect(() => {
    setPrecioTotal(producto.productId.price * producto.quantity);
  }, [producto.productId.price]);

  return (
    <div className="cardCarrito">
      <div className="FotocardCarrito">
        <img src={producto?.productId?.photo} alt={producto?.productId?._id} />
      </div>
      <div className="infoCardCarrito">
        <h5>
          {producto?.quantity}x {producto?.productId?.category}{" "}
          {producto?.productId?.brand} {producto?.productId?.name}
        </h5>
        <hr className="hr" />
        <div className="contadorCarrito">
          <p
            onClick={() => restar(producto.productId._id)}
            className="botonCardCarrito"
          >
            -
          </p>
          <p>{cantidad}</p>
          <p
            onClick={() => sumar(producto.productId._id)}
            className="botonCardCarrito"
          >
            +
          </p>
        </div>
        <hr className="hr" />
        <div className="preciosCarrito">
          <p>
            Unitario:{" "}
            <span className="negrita">
              $ {separator(producto?.productId?.price)}
            </span>
          </p>
          <p>
            Subtotal:<span className="negrita"> $ {separator(precioTotal)}</span>
          </p>
        </div>
      </div>
      <Button
        variant="contained"
        size="small"
        className="mc-botonCarritoEliminar"
        onClick={() => eliminarProducto(producto.productId._id)}
      >
        <DeleteOutlineOutlined id="deleteIconButton"></DeleteOutlineOutlined>
      </Button>
    </div>
  );
}
