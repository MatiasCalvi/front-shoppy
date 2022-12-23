import {
  Done,
  LocalShippingOutlined,
  SecurityOutlined,
  ShoppingCart,
} from "@mui/icons-material";

import {MenuItem,Button,Card,CardContent,Typography,FormControl,InputLabel,TextField,Select} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import productsActions from "../../redux/actions/productsActions";
import userActions from "../../redux/actions/userActions";
import "./detalleproducto.css";
import { toast, ToastContainer } from "react-toastify";

export default function DetalleProducto() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productos } = productsActions;
  const { agregarAcarro } = userActions;

  let { TodosLosproductos } = useSelector((store) => store.productsReducer);
  let { carrito, token, logged } = useSelector((store) => store.userReducer);

  let producto = TodosLosproductos.filter((x) => x._id === id);
  producto = producto[0];

  let [cantidad, setCantidad] = useState(1);
  let [inputConsultas,setInputConsultas]=useState('')

  useEffect(() => {
    dispatch(productos());
  }, []);

  const sumarAlCarrito = () => {
    if (cantidad < producto?.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const restarAlCarrito = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarritoFuncion = () => {
    if (logged) {
      const nuevoCarrito = [
        ...new Set(
          carrito
            .filter((x) => x.productId._id !== id)
            .concat({ productId: id, quantity: cantidad })
        ),
      ];

      dispatch(agregarAcarro({ token: token, carrito: nuevoCarrito }));

      toast.success(`Tienes ${cantidad} ${producto.name} en el carrito`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`Tienes que estar logeado para acceder al carrito`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  let arrayDeEspecificaciones = [];



  function especificaciones() {
    if (producto.specifications) {
      for (const [key, value] of Object.entries(producto.specifications)) {
        arrayDeEspecificaciones.push(
          `${key.toUpperCase()}: ${value.toUpperCase()}`
        );
      }
    }
  }

  function separator(numb) {
    if (producto) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return str.join(".");
    }
  }

  let clickSubmit=()=>{
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <>
      <div className="HeaderProductosDetalleEd">
        <h2>
          {producto?.category} {producto?.brand} {producto?.name}
        </h2>
      </div>
      <div className="MainProductosDetalleEd">
        <h2>
          Detalles del producto<span className="blanco">.</span>
        </h2>
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to={"/productos"}
        >
          <p className="volverAProductos">{"<"}</p>
        </NavLink>
        <div className="cardDetalleDeProductoEd">
          <div className="fotoDetalleDeProductoEd">
            <img src={producto?.photo} alt="" />
          </div>
          <div className="InfoDetalleDeProductoEd">
            <p className="ProductoTitulo">
              {producto?.name} <span className="blanco">.</span>
            </p>
            <p>
              <span className="negrita">Tipo:</span> {producto?.category}
            </p>
            <p>
              <span className="negrita">Marca:</span> {producto?.brand}
            </p>
            <p>
              <span className="negrita">Especificaciones:</span>
            </p>

            {producto && especificaciones()}

            {arrayDeEspecificaciones.map((x) => (
              <p>{x}</p>
            ))}

            <hr className="hrDetallesProductos" />
            <div className="PrecioStockDetalles">
              <p
                className="
              negrita blanco"
              >
                PRECIO $ {separator(producto?.price)}
              </p>
              <p
                className="
              negrita blanco"
              >
                {producto?.stock} ARTICULOS EN STOCK
              </p>
            </div>
            <hr className="hrDetallesProductos" />

            <div className="contadorParaCarrito">
              <p id="CantidadCarrito" onClick={agregarAlCarritoFuncion}>
                Cantidad
              </p>
              <p onClick={restarAlCarrito}>-</p> <p>{cantidad}</p>{" "}
              <p onClick={sumarAlCarrito}>+</p>
              <p id="agregarAlCarritoo" onClick={agregarAlCarritoFuncion}>
                Agregar al carrito
              </p>
              <NavLink className="BotonIrAlCarrito" to={"/carrito"}>
                <ShoppingCart fontSize="large" />
                <p id="agregarAlCarrito">Ir al carrito</p>
              </NavLink>
            </div>
            <ToastContainer />

            <hr className="hrDetallesProductos" />

            <div className="IconosDetallesEd">
              <div>
                <p className="IconosyParrafosAdicionales">
                  {" "}
                  <SecurityOutlined fontSize="large" />
                  Garantía - 12 meses
                </p>
              </div>
              <div>
                <p className="IconosyParrafosAdicionales">
                  {" "}
                  <Done fontSize="large" />
                  Stock disponible
                </p>
              </div>
              <div>
                <p className="IconosyParrafosAdicionales">
                  {" "}
                  <LocalShippingOutlined fontSize="large" />
                  Envíos a todo el país
                </p>
              </div>
            </div>
          </div>
        </div>
        {logged 
            ? <div className="mc-containerPreguntaDetalles">
                    <h2 className="mc-tituloConsultasCartelDetalles">¿Tenes dudas sobre el Producto?</h2>
                    <TextField
                      id="outlined-multiline-static"
                      label="Escriba su Pregunta"
                      multiline
                      rows={4}
                      onKeyUp={x=>setInputConsultas(x.target.value)} 
                      className="mc-inputPreguntaDetallesProducto"
                    />
                    <div className="mc-containerButtonDetalles">
                      {inputConsultas.length!==0
                            ?   <Button variant="contained" size="medium" className="mc-buttonSubmitDetalles" onClick={clickSubmit}>
                                  Enviar
                                </Button>
                            :   <Button variant="contained" size="medium" className="mc-buttonSubmitDetalles" disabled>
                                    Enviar
                                </Button>
                      }
                    </div>
              </div>
            
            : <></>
              
              }
      </div>
    </>
  );
}
