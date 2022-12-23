import React, { useEffect, useState } from "react";
import "./card.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import funciones from "../../config/funciones";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Card({ objeto, texto }) {
  let { rol, nombre, carrito, favoritos, apellido, logged, token } =
    useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const { agregarAfavoritos } = userActions;
  let cartel = "";
  const { separator } = funciones;

  if (objeto.stock < 5) {
    cartel = "POCO STOCK";
  }



  const newValue = (e) => {
    if (logged) {
      if (e.target.checked) {
        let nuevosFavoritos = favoritos.concat(objeto._id);
        dispatch(
          agregarAfavoritos({ token: token, favoritos: nuevosFavoritos })
        );

        setValue(!value);
      } else {
        let nuevosFavoritos = favoritos.filter((x) => x._id !== objeto._id);
        dispatch(
          agregarAfavoritos({ token: token, favoritos: nuevosFavoritos })
        );

        setValue(!value);
      }
    } else {

      toast.error(
        `Registrate para poder agregar favoritos`,
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
    
  };

  const [value, setValue] = useState(
    favoritos.map((x) => x._id).includes(objeto._id) ||
      favoritos.includes(objeto._id)
  );

  return (
    <div className="card">
      <div className="card-headphone">
        <img src={objeto.photo} alt="headphone" />
      </div>

      <div className="material-symbols-reaction">
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          checked={value}
          onChange={newValue}
          checkedIcon={<Favorite />}
        />
      </div>
      <div className="cartel">{cartel}</div>
      <div className="card-infos">
        <h3 className="card-title">{objeto.name}</h3>
        <h2 className="price">$ {separator(objeto.price)}</h2>

        <NavLink className="buy" to={`/detalle-producto/${objeto._id}`}>
          {texto}
        </NavLink>
      </div>
    </div>
  );
}
