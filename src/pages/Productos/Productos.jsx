import React, { useEffect, useState } from "react";
import "./productos.css";
import Card from "../../components/card/Card";
import GoTo from "../../components/GoTo/GoTo";
import adata from "../../imagenes/adata.png";
import amd from "../../imagenes/amd.png";
import rogstrix from "../../imagenes/rogstrix.png";
import tForce from "../../imagenes/t-force.png";
import zotac from "../../imagenes/zotacGaming.png";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "../../redux/actions/productsActions";

import { Paginator } from 'primereact/paginator';

const { productos, productosFiltrados } = productsActions;

export default function Productos() {
  let { TodosLosproductos } = useSelector((store) => store.productsReducer);
  let { productosFiltradosArray } = useSelector(
    (store) => store.productsReducer
  );

  let [value, setValue] = React.useState("");
  let [inputValue, setInputValue] = React.useState("");

  let [value2, setValue2] = React.useState("");
  let [inputValue2, setInputValue2] = React.useState("");

  const dispatch = useDispatch();
  let [nombre, setNombre] = useState(null);

  let [minimo, setMinimo] = useState(null);
  let [maximo, setMaximo] = useState(null);

  let [peticion, setPeticion] = useState("");

  const tipos = [...new Set(TodosLosproductos.map((x) => x.category))];
  const marcas = [...new Set(TodosLosproductos.map((x) => x.brand))];
  
  

  const productosTotales = async () => {
    dispatch(productos());
  };

  useEffect(() => {
    productosTotales();
  }, []);

  const filtroTexto = (e) => {
    setNombre(e.target.value);
  };

  const filtroMaxPrice = (e) => {
    setMinimo(e.target.value);
  };
  const filtroMinPrice = (e) => {
    setMaximo(e.target.value);
  };

  useEffect(() => {
    let peticionVariable = "?";

    if (nombre !== "" && nombre !== null) {
      peticionVariable += `name=${nombre}&`;
    }
    if (value !== "" && value !== null) {
      peticionVariable += `category=${value}&`;
    }
    if (value2 !== "" && value2 !== null) {
      peticionVariable += `brand=${value2}&`;
    }
    if (minimo !== "" && minimo !== null) {
      peticionVariable += `minPrice=${minimo}&`;
    }
    if (maximo !== "" && maximo !== null) {
      peticionVariable += `maxPrice=${maximo}&`;
    }

    setPeticion(peticionVariable);
  }, [nombre, value, value2, minimo, maximo]);

  const peticionProductosFiltrados = async () => {
    dispatch(productosFiltrados({ peticion: peticion }));
  };

  useEffect(() => {
    peticionProductosFiltrados();
  }, [peticion]);

 /*  function PaginatorF(items, page, per_page) {

    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
  
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
    offset:offset
    };
  }
  let array1=PaginatorF(productosFiltradosArray)
  console.log(array1) */


  return (
    <>
      <div className="mainProductos">
        <div className="divInicio">
          <h2>
            NUESTROS PRODUCTOS<span className="blanco">.</span>
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

      <div className="mc-containerProductos" id="productos">
        <div className="mc-ContainerFiltros">
          <h2 className="mc-subtituloProducto">Busca tu Producto</h2>
          <TextField
            onChange={filtroTexto}
            id="name"
            label="Nombre"
            variant="outlined"
          />
          {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div> */}
          <br />
          <Autocomplete
            style={{ width: "100%" }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={tipos}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tipo" />}
          />
          {/* <h3 className='titulos-input'>Marca</h3>
            <select name="" id="" className='mc-inputs'></select>
            <h3 className='titulos-input'>Color</h3>
            <select name="" id="" className='mc-inputs'></select>
            <h3 className='titulos-input'>Precio</h3> */}
          {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div> */}
          <br />
          <Autocomplete
            value={value2}
            style={{ width: "100%" }}
            onChange={(event, newValue) => {
              setValue2(newValue);
            }}
            inputValue={inputValue2}
            onInputChange={(event, newInputValue) => {
              setInputValue2(newInputValue);
            }}
            id="controllable-states-demo"
            options={marcas}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Marca" />}
          />
          <br />
          <h3 className="titulos-inputPrecio">Precio</h3>
          <div className="mc-containerPrecios">
            <TextField
              id="maxPrice"
              onChange={filtroMaxPrice}
              placeholder="$ Maximo"
              sx={{ width: 120 }}
              type="number"
              variant="outlined"
            />
            <h4 className="mc-guionPrecio">-</h4>
            <TextField
              id="minPrice"
              onChange={filtroMinPrice}
              placeholder="$ Maximo"
              type="number"
              sx={{ width: 120 }}
              variant="outlined"
            />
          </div>
          <div className="mc-containerPublicidades">
              <aside className="mc-containerPublicidad"></aside>
              <aside className="mc-containerPublicidad2"></aside>
          </div>
        </div>
        <div className="mc-containerCardsProductos">
          <div className="mc-containerTitulosProductos">
            <h2 className="mc-TituloProductos">
              Nuestra Tienda<span className="blanco">.</span>
            </h2>
          </div>
          <div className="mc-containerProductGeneral">
            <div className="mc-containerCardsProducts">
              {productosFiltradosArray.length > 0 ? (
                productosFiltradosArray.map((x) => (
                  <Card objeto={x} texto="COMPRAR" key={x._id}></Card>
                ))
              ) : (
                <h4>No se encontraron productos con su busqueda</h4>
              )}
            </div>
            {/* <div className="paginator-demo">
              
                <Paginator first={basicFirst} rows={basicRows} totalRecords={120} onPageChange={onBasicPageChange}></Paginator>
              
            </div> */}
          </div>
        </div>
      </div>
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
    </>
  );
}
