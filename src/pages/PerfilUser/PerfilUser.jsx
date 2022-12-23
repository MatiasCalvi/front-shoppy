import React, { useState, useEffect } from "react";
import "./perfilUser.css";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  CardActions,
  Typography,
  Button,
  CardContent,
  Card,
  InputAdornment,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import DownloadIcon from "@mui/icons-material/Download";
import PaidIcon from "@mui/icons-material/Paid";
import HelpIcon from "@mui/icons-material/Help";

import TextField from "@mui/material/TextField";

import GoTo from "../../components/GoTo/GoTo";

import userActions from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";

import adata from "../../imagenes/adata.png";
import amd from "../../imagenes/amd.png";
import asrock from "../../imagenes/asrock.png";
import rogstrix from "../../imagenes/rogstrix.png";
import tForce from "../../imagenes/t-force.png";
import western from "../../imagenes/western-digital.png";
import zotac from "../../imagenes/zotacGaming.png";

export default function PerfilUser() {
  const dispatch = useDispatch();

  const { logged, nombre, apellido, date, dni, email, direccion, nick, token,cp,phone,nombreDni } =
    useSelector((state) => state.userReducer);

  let { editUser } = userActions;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const [inputNick, setInputNick] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputContra, setInputContra] = useState("");
  const [inputVerificarContra, setInputVerificarContra] = useState("");
  const [inputNombreDni, setInputNombreDni] = useState("");
  const [inputDni, setInputDni] = useState("");
  const [inputDomicilio, setInputDomicilio] = useState("");
  const [inputCP, setInputCP] = useState("");
  const [inputTelefono, setInputTelefono] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let editNick = async () => {

    if (inputNick === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { nick: inputNick}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
        }
    
  };

  let editMail = async () => {
  

    if (inputMail === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { email: inputMail}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }
  };

  let editContra = async () => {
   

    if(inputContra.length!==0 && inputVerificarContra.length!==0){

        if(inputContra===inputVerificarContra){
            
                let data = { password: inputContra}
        
            try {
        
                let res = await dispatch(editUser({ token, data }));
                  
                      if (res.payload.success) {
                            toast.success(`El campo fue editado con exito `, {
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
                        res.payload.response.map((x) =>
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
        
                  }
                  catch(error){
        
                      console.log(error.message)
        
                  }
          }
          else{

            toast.error("Los caracteres no coinciden", {
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
    }
    else{

        toast.error("Se Debe Completar todos los campos !", {
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
    
  };

  let editNomDni = async () => {

    if (inputNombreDni === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { nameDni: inputNombreDni}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }

  };
  let editDni = async () => {

    if (inputDni === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { dni: inputDni}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }

  };
  let editDom = async () => {
    

    if (inputDomicilio === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { adress: inputDomicilio}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }

  };

  let editCP = async () => {

    if (inputCP === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { cp: inputCP}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }

  };

  let editTel = async () => {
    

    if (inputTelefono === "") {
      toast.error("Debe Completar todos los campos !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

          let data = { phone: inputTelefono}

          try {

              let res = await dispatch(editUser({ token, data }));
          

              if (res.payload.success) {
                    toast.success(`El campo fue editado con exito `, {
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
                res.payload.response.map((x) =>
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

          }
          catch(error){

              console.log(error.message)

          }
    }

  };

  return (
    <>
      <div className="mainPerfil">
        <div className="divInicio">
          <h2>
            TU LUGAR EN SHOPPY<span className="blanco">.</span>
          </h2>
          <p className="parrafoInicio">
            Al registrarte ayudas a que esta gran familia como es shoppy siga
            creciendo y pueda seguir ayudandote en la busqueda de los
            componentes para tu pc. Por eso es que decidimos darte este pequeño
            lugar para que te sientas aun mas parte de todo esto.
          </p>
          <a href="#perfil" className="buttonInicio">
            <GoTo texto="VER MAS" />
          </a>
        </div>
      </div>
      <div id="perfil" className="mc-containerPerfil">
        <Card className="mc-cardPerfil">
          {nick===""
                  ? <Avatar className="mc-iconoAvatar" sx={{ bgcolor: deepOrange[500] }}>
                        {nombre.charAt(0)} 
                    </Avatar>
                  : <Avatar className="mc-iconoAvatar" sx={{ bgcolor: deepOrange[500] }}>
                        {nick.charAt(0)} 
                    </Avatar>}
          <CardContent className="mc-containerSubCard">
            {nick !== "" ? (
              <Typography
                className="mc-tituloConsultasCartel"
                sx={{ fontSize: 20 }}
                color="text.black"
                gutterBottom
              >
                {nick}
              </Typography>
            ) : (
              <Typography
                className="mc-tituloConsultasCartel"
                sx={{ fontSize: 20 }}
                color="text.black"
                gutterBottom
              >
                {nombre + " " + apellido}
              </Typography>
            )}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Perfil creado : {date}
            </Typography>
          </CardContent>
        </Card>
        <div className="mc-containerMisDatos">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="mc-titulosAcordionConsultas">
                Mis Datos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mc-renderInput">
                <p>
                  Nombre de Usuario :
                  {nick==="" ?
                            <span className="mc-renderLetra"> {nombre + " " + apellido}</span>
                          : <span className="mc-renderLetra"> {nick}</span>}
                </p>
                <p>
                  E-mail : <span className="mc-renderLetra">{email}</span>
                </p>
              </div>
              <div className="mc-containerDatosPersonales">
                <div className="mc-inputsPerfil">
                  <TextField
                    id="nombre"
                    label="Nombre de Usuario"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputNick(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editNick}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfil">
                  <TextField
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputMail(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editMail}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfilContra">
                  <div className="mc-inputsPerfilContraSub ">
                    <FormControl
                      variant="outlined"
                      onChange={(text) => setInputContra(text.target.value)}
                    >
                      <InputLabel htmlFor="password">Contraseña</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Contraseña"
                      />
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      onChange={(text) =>
                        setInputVerificarContra(text.target.value)
                      }
                    >
                      <InputLabel htmlFor="confirmacionPassword">
                        Verifique su contraseña{" "}
                      </InputLabel>
                      <OutlinedInput
                        id="confirmacionPassword"
                        type={showPassword2 ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Verifique su contraseña"
                      />
                    </FormControl>
                  </div>
                  <div className="mc-containerButtonContra">
                    <Button
                      variant="contained"
                      size="small"
                      className="mc-buttonAcordionContra"
                      onClick={editContra}
                    >
                      {<EditIcon className="mc-iconButtonPerfilContra" />}
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mc-containerDatosPersonales">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="mc-titulosAcordionConsultas">
                Datos Personales
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mc-renderInput2">
                <p>
                  Nombre de DNI :{" "}
                  {nombreDni!==""
                          ? <span className="mc-renderLetra">{nombreDni}</span>
                          : <span className="mc-renderLetra">Agregar el nombre del DNI para el realizamiento de sus compras virtuales</span>}
                </p>
                <p>
                  DNI : <span className="mc-renderLetra">{dni}</span>
                </p>
                <p>
                  Domicilio :{" "}
                  <span className="mc-renderLetra">{direccion}</span>
                </p>
                <p>
                  C.P : <span className="mc-renderLetra">{cp}</span>
                </p>
                {phone!==""
                        ? <p>
                            Numero de Contacto :{" "}
                            <span className="mc-renderLetra">{phone}</span>
                          </p>
                        : <p>
                            Numero de Contacto :{" "}
                            <span className="mc-renderLetra">No se registra algun numero de contacto, si lo desea puede agregarlo</span>
                          </p>} 
              </div>
              <div className="mc-containerDatosPersonales">
                <div className="mc-inputsPerfil">
                  <TextField
                    id="nombreDeDNI"
                    label="Nombre de DNI"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    defaultValue={nombre}
                    /* onChange={(text) => setInputNombreDni(text.target.value)} */
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editNomDni}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfil">
                  <TextField
                    id="dni"
                    label="DNI"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputDni(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editDni}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfil">
                  <TextField
                    id="domicilio"
                    label="Domicilio"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputDomicilio(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editDom}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfil">
                  <TextField
                    id="codigoPostal"
                    label="Codigo Postal"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputCP(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editCP}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
                <div className="mc-inputsPerfil">
                  <TextField
                    id="agregarNumeroDeContacto"
                    label="Agregar numero de contacto"
                    variant="outlined"
                    className="mc-inputsPerfilAcordion"
                    onChange={(text) => setInputTelefono(text.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    className="mc-buttonAcordion"
                    onClick={editTel}
                  >
                    {<EditIcon className="mc-iconButtonPerfil" />}
                  </Button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mc-containerFacturas">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="mc-titulosAcordionConsultas">
                Mis Facturas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mc-containerDatosPersonales">
                <Card className="mc-cardPerfilFacturas">
                  <CardContent className="mc-containerSubCardFacturas">
                    <div className="mc-subContainerFactura">
                      <Typography
                        className="mc-tituloCartelFactura"
                        sx={{ fontSize: 20 }}
                        color="text.black"
                        gutterBottom
                      >
                        Tipo: <span className="mc-spanFactura">Factura B</span>
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5 }}
                        className="mc-tituloCartelFactura"
                      >
                        Comprobante:{" "}
                        <span className="mc-spanFactura">00003-0000305225</span>
                      </Typography>
                    </div>
                    <DownloadIcon />
                  </CardContent>
                </Card>
                <Card className="mc-cardPerfilFacturas">
                  <CardContent className="mc-containerSubCardFacturas">
                    <div className="mc-subContainerFactura">
                      <Typography
                        className="mc-tituloCartelFactura"
                        sx={{ fontSize: 20 }}
                        color="text.black"
                        gutterBottom
                      >
                        Tipo: <span className="mc-spanFactura">Factura B</span>
                      </Typography>
                      <Typography
                        sx={{ mb: 1.5 }}
                        className="mc-tituloCartelFactura"
                      >
                        Comprobante:{" "}
                        <span className="mc-spanFactura">00003-0000305330</span>
                      </Typography>
                    </div>
                    <DownloadIcon />
                  </CardContent>
                </Card>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mc-containerFacturasYPreguntas">
          <div className="mc-containerPregYCoins">
            <div className="mc-containerDatosPersonales">
              <h2 className="mc-titulosCardsPerfil">Mis Preguntas :</h2>
              <Card className="mc-cardPerfilFacturas">
                <CardContent className="mc-containerCardCoinsYPreguntas">
                  <div className="mc-subContainerCoins">
                    <Typography className="mc-titulosCoins">
                      <HelpIcon /> Tenes un total de 2 preguntas
                    </Typography>
                    <Typography
                      className="mc-tituloCartelCoins"
                      sx={{ fontSize: 20 }}
                      color="text.black"
                      gutterBottom
                    >
                      Podés ver las preguntas que hiciste y darle seguimiento
                      desde
                    </Typography>
                  </div>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      className="mc-buttonCoins"
                    >
                      ACA
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
              <h2 className="mc-titulosCardsPerfil">Mis Coins :</h2>
              <Card className="mc-cardPerfilFacturas">
                <CardContent className="mc-containerCardCoinsYPreguntas">
                  <div className="mc-subContainerCoins">
                    <Typography className="mc-titulosCoins">
                      <PaidIcon /> 82 Coins
                    </Typography>
                    <Typography
                      className="mc-tituloCartelCoins"
                      sx={{ fontSize: 20 }}
                      color="text.black"
                      gutterBottom
                    >
                      Tenés un total de 82 coins. Para ver el detalle de tus
                      movimientos entrá
                    </Typography>
                  </div>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      className="mc-buttonCoins"
                    >
                      ACA
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
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
