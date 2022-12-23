import {
  Alert,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import "../Registrarte/registro.css";
import "./registro.css";
import axios from "axios";
import API from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Registro() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const form = React.useRef();

  const [nuevoUsuario, setnuevoUsuario] = React.useState({
    name: "",
    lastName: "",
    dni: "",
    adress: "",
    role: "user",
    photo: "https://img.icons8.com/fluency-systems-regular/48/000000/user.png",
    age: 0,
    email: "",
    password: "",
    cp:"",
    products: [],
    favorites: [],
    phone:"",
    nick:''
  });

  const handleChange = (e) => {
    setnuevoUsuario({ ...nuevoUsuario, [e.target.id]: e.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registro = async () => {
    const respuesta = await axios.post(`${API}auth/signup`, nuevoUsuario);


    if (respuesta.data.success) {
      toast.success(
        `Su cuenta fue creada correctamente, verifiquela para ingresar`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setnuevoUsuario({
        name: "",
        lastName: "",
        dni: "",
        adress: "",
        role: "user",
        photo:
          "https://img.icons8.com/fluency-systems-regular/48/000000/user.png",
        age: 0,
        email: "",
        password: "",
        cp: "",
        products: [],
        favorites: [],
        nick:"",
        phone:"",
      });
      form.current.reset();
      setTimeout(function () {
        navigate("/ingresar");
      }, 4500);
    } else if (!respuesta.data.success) {
      respuesta.data.message.map((mensaje) =>
        toast.error(`${mensaje}`, {
          position: "bottom-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    }
  };

  return (
    <div className="Ingreso">
      <img
        className="shoppyLogoRegistro"
        src="https://cdn.discordapp.com/attachments/830354293822324736/1051744433550397510/Sin_titulo-2.png"
        alt="logo_shoppy"
      />

      <div className="edFormRegistro">
        <h2>
          REGISTRATE<span className="blanco">.</span>
        </h2>
        <div>
          <form ref={form}>
            <TextField
              id="name"
              label="Nombre"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="lastName"
              label="Apellido"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="age"
              label="Edad"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="dni"
              label="Dni"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="adress"
              label="Domicilio"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
             <TextField
              id="cp"
              label="Codigo Postal"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              onChange={handleChange}
            />
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </form>
          <div className="botonesForm">
            <NavLink className="BotonRegistrarme" to="/ingresar">
              <p>INGRESAR CON CUENTA</p>
            </NavLink>
            <button onClick={registro}>REGISTRATE</button>
          </div>
        </div>
      </div>
      <div className="edFotoRegistro"></div>
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
