import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import "./menuNavBar.css";
import {
  FavoriteBorderOutlined,
  LoginOutlined,
  LogoutOutlined,
  PaymentsOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { toast, ToastContainer } from "react-toastify";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function TemporaryDrawer() {
  let { rol, nombre, token, logged, nick } = useSelector(
    (store) => store.userReducer
  );
  const [state, setState] = React.useState({
    right: false,
  });
  const location = useLocation();
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const { logout } = userActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAccion = () => {
    dispatch(logout(token));
    toast.success(`Cerraste tu sesion exitosamente, vuelva pronto!`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(function () {
      navigate("/");
      url.reload();
    }, 2000);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {logged && rol === "user"
          ? [
              { nombre: "Perfil", ruta: "/perfil" },
              { nombre: "Carrito", ruta: "/carrito" },
              { nombre: "Favoritos", ruta: "/favoritos" },
              { nombre: "Mis compras", ruta: "/miscompras" },
            ].map((boton, index) => (
              <NavLink
                key={index}
                to={boton.ruta}
                style={{ textDecoration: "none", color: "#333333" }}
              >
                <ListItem key={boton.nombre} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 ? <SettingsOutlined /> : null}
                      {index === 1 ? <ShoppingCartOutlined /> : null}
                      {index === 2 ? <FavoriteBorderOutlined /> : null}
                      {index === 3 ? <PaymentsOutlined /> : null}
                    </ListItemIcon>
                    <ListItemText primary={boton.nombre} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))
          : null}
        {logged && rol === "admin"
          ? [{ nombre: "Administracion", ruta: "/admin" }].map(
              (boton, index) => (
                <NavLink
                  key={index}
                  to={boton.ruta}
                  style={{ textDecoration: "none", color: "#333333" }}
                >
                  <ListItem key={boton.nombre} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index === 0 ? <SettingsOutlined /> : null}
                        {index === 1 ? <ShoppingCartOutlined /> : null}
                        {index === 2 ? <FavoriteBorderOutlined /> : null}
                        {index === 3 ? <PaymentsOutlined /> : null}
                      </ListItemIcon>
                      <ListItemText primary={boton.nombre} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              )
            )
          : null}
      </List>
      <Divider />
      <List>
        {!logged
          ? ["Login"].map((text, index) => (
              <NavLink
                to="/ingresar"
                key={index}
                style={{ textDecoration: "none", color: (0, 0, 0, 0.54) }}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LoginOutlined />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))
          : ["Logout"].map((text, index) => (
              <ListItem onClick={logoutAccion} key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <LogoutOutlined /> : <LogoutOutlined />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {!logged ? (
            <Button onClick={toggleDrawer(anchor, true)}>
              <AccessibilityNewOutlinedIcon
                color="success"
                fontSize="large"
              ></AccessibilityNewOutlinedIcon>
            </Button>
          ) : nick==='' ?(
            <Button onClick={toggleDrawer(anchor, true)}>
              <Avatar
                className="mc-iconoAvatarNavbar"
                sx={{ bgcolor: "#ef837b" }}
              >
                {nombre?.charAt(0)}
              </Avatar>
            </Button>
          ): (<Button onClick={toggleDrawer(anchor, true)}>
          <Avatar
            className="mc-iconoAvatarNavbar"
            sx={{ bgcolor: "#ef837b" }}
          >
            {nick?.charAt(0)}
          </Avatar>
        </Button>) }
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer />
    </div>
  );
}
