import {
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import userActions from "../../redux/actions/userActions";

import { NavLink, useNavigate } from "react-router-dom";
import "./ingresar.css";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


export default function Ingresar() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loginUsuario, setLoginUsuario] = React.useState({
    password: "",
  });
  const { ingress } = userActions;
  const form = React.useRef();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputText = (e) => {
    setLoginUsuario({ ...loginUsuario, [e.target.id]: e.target.value });
  };

  const ingresar = async () => {
    const respuesta = await dispatch(ingress(loginUsuario));
    if (respuesta.payload.success) {
      toast.success(
        `Bienvenido a shoppy ${respuesta.payload.response.user.name} `,
        {
          position: "bottom-left",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      form.current.reset();
      setTimeout(function () {
        navigate("/inicio");
      }, 1000);
    } else {
      respuesta.payload.response.map((x) =>
        toast.error(`${x}`, {
          position: "bottom-left",
          autoClose: 3000,
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
        className="shoppyLogoIngreso"
        src="https://cdn.discordapp.com/attachments/830354293822324736/1051744433550397510/Sin_titulo-2.png"
        alt="logo_shoppy"
      />
      <div className="edFotoIngreso"></div>
      <div className="edFormIngreso">
        <h2>
          INGRESO<span className="blanco">.</span>
        </h2>
        <div>
          <form ref={form}>
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={handleInputText}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={handleInputText}
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
            <NavLink className="BotonRegistrarme" to="/registro">
              <p>REGISTRARME</p>
            </NavLink>
            <button onClick={ingresar}>INGRESA A SHOPPY</button>
          </div>
        </div>
      </div>
      <NavLink to={"/inicio"}>
        <div className="edVolverAInicio">
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
          <ToastContainer />
        </div>
      </NavLink>
    </div>
  );
}
