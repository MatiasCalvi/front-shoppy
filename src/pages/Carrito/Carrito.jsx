import React, { useEffect, useState } from "react";
import "./carrito.css";
import GoTo from "../../components/GoTo/GoTo";
import CardCarrito from "../../components/CardCarrito/CardCarrito";
import {
  CloseOutlined,
  Done,
  DoneAllOutlined,
  DoneOutlined,
  ErrorOutline,
  ExpandMore,
  LocalShippingOutlined,
  PaymentOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/userActions";
import paymentActions from "../../redux/actions/paymentActions";
import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import funciones from "../../config/funciones";
import { async } from "q";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import API from "../../config/api";

export default function Carrito() {
  let { carrito, token, monedas, logged } = useSelector(
    (store) => store.userReducer
  );

  const { getDatos, editUser } = userActions;
  const { mercadoPago } = paymentActions;

  let [aprove, setAprove] = React.useState(false);

  const dispatch = useDispatch();
  const { separator } = funciones;

  let [total, setTotal] = useState();

  useEffect(() => {
    dispatch(getDatos({ token: token }));
  }, []);

  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    if (carrito.length !== 0) {
      const precioTotalCompra = carrito
        .map((x) => x.productId.price * x.quantity)
        .reduce(function (valorAnterior, valorActual) {
          return valorAnterior + valorActual;
        });

      setTotal(separator(precioTotalCompra));
    }
  }, [carrito]);

  if (carrito.length === 1) {
    if (!aprove) {
      var items = [
        {
          title: carrito[0].productId.name,
          quantity: carrito[0].quantity,
          unit_price: carrito[0].productId.price,
        },
      ];
    } else {
      var items = [
        {
          title: carrito[0].productId.name,
          quantity: carrito[0].quantity,
          unit_price: carrito[0].productId.price - monedas,
        },
      ];
    }
  } else {
    var items = [
      {
        title: "Productos",
        quantity: 1,
        unit_price: Number(total * 1000),
      },
    ];
  }

  console.log(items);
  let preference = {
    back_urls: {
      failure: "http://localhost:3000/fail",
      success: "http://localhost:3000/success",
    },
  };
  preference.items = items;

  let payment = async () => {
    try {
      let res = await dispatch(mercadoPago(preference));
      console.log(res);
      console.log(res.payload.response.init_point);
      let data = {};
      data.aprove = aprove;
      let edit = dispatch(editUser({ token, data }));
      /* if (res.payload.success) {
        window.location.assign(res.payload.response.init_point);
      }  */
    } catch (error) {
      console.log(error.response);
    }
  };

  let [monedasDisponibles, setMonedas] = useState(monedas);

  useEffect(() => {
    setMonedas(monedas);
  }, [monedas]);

  const aplicarMonedas = async () => {
    if (monedas === 0) {
      toast.error(`No tienes mas shoppy coins`, {
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
      Swal.fire({
        title: `Quieres utilizar tus ${monedasDisponibles} shoppy coins?`,
        text: `Se te descontará directamente del precio total`,
        imageUrl: "https://img.icons8.com/color/80/null/average-2.png",
        showCancelButton: true,
        margin: "0",
        cancelButtonColor: "#c3c3c3",
        confirmButtonColor: "#c3c3c3",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Descuento aplicado",
            `Utilizaste ${monedasDisponibles} para la  compra`,
            "success"
          );

          setTotal(separator(total * 1000 - monedas));
          setAprove(true);
          let data = { aprove: true };
          let token = JSON.parse(localStorage.getItem("token"));
          token = token.token.user;
          dispatch(editUser({ token, data }));
          let headers = { headers: { Authorization: `Bearer ${token}` } };
          axios.patch(`${API}auth/me`, data, headers);
          /* let data = { coins: 0 };
          const res = await dispatch(editUser({ token, data }));
          setMonedas(res.payload.response.coins); */
        }
      });
    }
  };

  let sacarMonedas = () => {
    setAprove(false);
    setTotal(separator(total * 1000 + monedas));
    let data = { aprove: false };
    let token = JSON.parse(localStorage.getItem("token"));
    token = token.token.user;
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    axios.patch(`${API}auth/me`, data, headers);
  };

  return (
    <>
      <div className="mainCarrito">
        <div className="divInicio">
          <h2>
            FINALIZA TU COMPRA<span className="blanco">.</span>
          </h2>
          <p className="parrafoInicio">
            En esta seccion podes ver todos los componentes que fuiste agregando
            al carrito, analizarlos y finalizar tu compra
          </p>

          <a href="#productos" className="buttonInicio">
            <GoTo texto="FINALIZAR" />
          </a>
        </div>
      </div>
      <h2 style={{ textAlign: "center", marginTop: 25 }}>
        TUS PRODUCTOS SELECCIONADOS <span className="blanco">.</span>
      </h2>

      <div className="edContainerCarrito">
        {!logged ? (
          <div
            className="containerCardsFavoritos"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="sinarticulosencarro">
              <h3>Ingresá para ver tu carrito</h3>
              <NavLink className="botonIrAproductos" to="/ingresar">
                Ingresar
              </NavLink>
            </div>
          </div>
        ) : carrito.length === 0 ? (
          <div
            className="edContainerCardsCarrito"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="sinarticulosencarro">
              <h3>No tienes articulos en el carrito</h3>
              <NavLink className="botonIrAproductos" to="/productos">
                Investigar los productos disponibles
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <div className="edContainerCardsCarrito">
              {carrito.map((x) => (
                <CardCarrito producto={x} key={x._id} />
              ))}
            </div>
            <div className="FinalizarCompraDivEd">
              <div>
                <h3>PRECIO TOTAL DE LA COMPRA</h3>
                <p className="precioTotalCostadoEd">$ {total}</p>
              </div>
              <Accordion className="accordionCarrito">
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="mc-titulosAcordionConsultas">
                    Codigo promocional
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="mc-containerDatosPersonales">
                    <div className="ed-InputCodigoPromocional">
                      <TextField
                        id="nombre"
                        label="Inserte codigo promocional"
                        variant="outlined"
                        className="mc-inputsPerfilAcordion"
                        onChange={(text) => setInputCode(text.target.value)}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        className="mc-buttonAcordion"
                        /* onClick={editMail} */
                      >
                        {<DoneOutlined className="mc-iconButtonPerfil" />}
                      </Button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="accordionCarrito">
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="mc-titulosAcordionConsultas">
                    Shoppy coins
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="mc-containerDatosPersonales">
                    {!aprove ? (
                      <>
                        <div className="divMonedasCarrito">
                          <p className="monedasEdCarrito">
                            Tienes {monedasDisponibles} shoppy coins
                          </p>
                          <img src="https://img.icons8.com/color/30/null/average-2.png" />
                        </div>
                        <div className="ed-InputCodigoPromocional">
                          <p>Quieres agregarlas a tu compra?</p>
                          <Button
                            variant="contained"
                            size="small"
                            className="mc-buttonAcordion"
                          >
                            {
                              <DoneOutlined
                                size="small"
                                onClick={aplicarMonedas}
                                className="mc-iconButtonPerfil"
                              />
                            }
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="divMonedasCarrito">
                          <p className="monedasEdCarrito">
                            Usaste {monedasDisponibles} shoppy coins
                          </p>
                          <img src="https://img.icons8.com/color/30/null/average-2.png" />
                        </div>
                        <div className="ed-InputCodigoPromocional">
                          <p>Se te aplico el descuento al precio total</p>
                          <Button
                            variant="contained"
                            size="small"
                            className="mc-buttonAcordion"
                          >
                            {
                              <CloseOutlined
                                size="small"
                                onClick={sacarMonedas}
                                className="mc-iconButtonPerfil"
                              />
                            }
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
              <div
                className="botonFinalizarCompraEd"
                to="/productos"
                onClick={payment}
              >
                Finalizar compra
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
