import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carrousel from "../../components/Carrousel/Carrousel";
import GoTo from "../../components/GoTo/GoTo";
import ItemsShoppy from "../../components/ItemsShoppy/ItemsShoppy";
import imagenes from "../../imagenes/imagenes";
import "../Inicio/inicio.css";
import productsActions from "../../redux/actions/productsActions";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Inicio() {
  let { rol, nombre, carrito, favoritos, apellido, logged, token } =
    useSelector((store) => store.userReducer);
  const { amd, adata, rogstrix, tForce, zotac } = imagenes;
  const [activeNuevos, setActiveNuevos] = useState(false);
  const [activeUltimosStocks, setUltimosStocks] = useState(false);

  const dispatch = useDispatch();
  const { productos } = productsActions;

  let { TodosLosproductos } = useSelector((store) => store.productsReducer);
  let [productosInicio, setProductos] = useState(TodosLosproductos);

  const array1 = productosInicio.slice(0, 10);
  const array2 = productosInicio.slice(10, 20);

  const productosTotales = async () => {
    const res = await dispatch(productos());
    setProductos(res.payload.response);
  };

  const nuevos = () => {
    setActiveNuevos(!activeNuevos);
    activeUltimosStocks
      ? setUltimosStocks(!activeUltimosStocks)
      : setUltimosStocks(activeUltimosStocks);
  };

  const UltimosStocks = () => {
    activeNuevos
      ? setActiveNuevos(!activeNuevos)
      : setActiveNuevos(activeNuevos);
    setUltimosStocks(!activeUltimosStocks);
  };

  useEffect(() => {
    productosTotales();
  }, [logged]);

  return (
    <>
      <div className="mainInicio">
        <div className="divInicio">
          <h2>
            SHOPPY COMPUTACION<span className="blanco">.</span>
          </h2>
          <p className="parrafoInicio">
            Tenemos todo lo que buscas, tenemos los mejores productos y las
            mejores marcas. Te invitamos a ver nuestros productos en stock.
          </p>

          <a href="#productos" className="buttonInicio">
            <GoTo texto="VER MAS" />
          </a>
        </div>
      </div>
      <div id="productos" className="productosMain">
        <div className="headerInicio">
          <h2>
            NUESTROS PRODUCTOS <span className="blanco">.</span>
          </h2>
          {/* <div className="selectsInicio">
              <p className={activeNuevos ? "underline" : ""} onClick={nuevos}>
              NUEVOS
            </p>
            <p
              className={activeUltimosStocks ? "underline" : ""}
              onClick={UltimosStocks}
            >
              ULTIMOS STOCKS
            </p> 
          </div> */}
        </div>
        <div className="containerCardsInicio">
          <Carrousel array={array1}></Carrousel>
          <Carrousel array={array2}></Carrousel>
        </div>
        <ItemsShoppy />
        {!logged ? (
          <div className="Registrate">
            <h3>Registrate y obtené beneficios</h3>
            <p>
              Registrate para recibir todas nuestras noticias sobre productos
              nuevos, cupones de compra y demas novedades. Ademas como estamos
              en mes mundialista, por registrarte en nuestra pagina estaras
              participando de un sorteo por una camiseta de la seleccion.
            </p>
            <NavLink to={"/registro"}>
              <a className="buttonInicioRegistrate">REGISTRATE</a>
            </NavLink>
          </div>
        ) : (
          <div className="festejaLasFiestas">
            <h3>Festeja las fiestas con Shoppy</h3>
            <p>
              Tenemos todo para que puedas regalarle lo mejor a tu gente querida, monitores, auriculares, teclados y muchas cosas mas. Ingresa a nuestra seccion de productos y analiza las mejores opciones para ti.
            </p>
            <NavLink to={"/productos"}>
              <a className="buttonInicioRegistrate">VER MAS</a>
            </NavLink>
          </div>
        )}
        <ToastContainer />
        <div className="slider" style={{ marginTop: 50, marginBottom: 50 }}>
          <div className="slide-track">
            <div className="slide">
              <img src={adata} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={amd} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={rogstrix} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={tForce} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={zotac} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={rogstrix} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={tForce} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={adata} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={zotac} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={rogstrix} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={tForce} height="100" width="250" alt="" />
            </div>
            <div className="slide">
              <img src={zotac} height="100" width="250" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
