import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import MenuNavBar from "../MenuNavBar/MenuNavBar";
import { Badge } from "@mui/material";
import "../Navbar/navbar.css";
import { FavoriteBorder, ShoppingCartOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function NavBar() {
  const location = useLocation();
  let { rol, nombre, carrito, favoritos, apellido, logged, token } =
    useSelector((store) => store.userReducer);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  let [mostrarMenu, setMostrarMenu] = useState(false);
  const menuOn = () => {
    setMostrarMenu(!mostrarMenu);
  };

  return (
    <header className="bg-transparent">
      <nav className="navbar  navbar-expand-lg pt-2 pt-lg-1">
        <img
          src="https://cdn.discordapp.com/attachments/830354293822324736/1051744433550397510/Sin_titulo-2.png"
          alt="logo_shoppy"
        />
        <div className="px-3 px-lg-5">
          <h1 className="d-flex d-none">Shoppy</h1>
          <div className="menu" onClick={menuOn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            {mostrarMenu ? (
              <ul className="navbar-nav d-md-flex flex-md-row justify-content-md-center align-items-center">
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Productos</a>
                </li>
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Inicio</a>
                </li>
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Consultas</a>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-md-flex flex-md-row justify-content-md-center align-items-center">
              <NavLink
                to="/productos"
                className={url === "/productos" ? "underline" : "none"}
              >
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Productos</a>
                </li>
              </NavLink>

              <NavLink
                to="/inicio"
                className={url === "/inicio" ? "underline" : "none"}
              >
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Inicio</a>
                </li>
              </NavLink>
              <NavLink
                to="/consultas"
                className={url === "/consultas" ? "underline" : "none"}
              >
                <li className="nav-item mx-md-3 mx-lg-1">
                  <a className="nav-link">Consultas</a>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="iconos">
          <IconButton aria-label="cart">
            <Badge badgeContent={favoritos.length} color="primary">
              <NavLink to={"/favoritos"} style={{ color: "#f3f3f3" }}>
                <FavoriteBorder />
              </NavLink>
            </Badge>
          </IconButton>
          <IconButton aria-label="cart">
            <Badge badgeContent={carrito.length} color="primary">
              <NavLink to={"/carrito"} style={{ color: "#f3f3f3" }}>
                <ShoppingCartOutlined />
              </NavLink>
            </Badge>
          </IconButton>{" "}
          <MenuNavBar />
        </div>
      </nav>
    </header>
  );
}
