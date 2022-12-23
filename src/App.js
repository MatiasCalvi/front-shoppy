import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Administrador from "./pages/Administrador/Administrador";
import Bienvenida from "./pages/Bienvenida/Bienvenida";
import Carrito from "./pages/Carrito/Carrito";
import Consultas from "./pages/Consultas/Consultas";
import DetalleProducto from "./pages/DetalleProducto/DetalleProducto";
import Error404 from "./pages/Error404/Error404";
import Ingresar from "./pages/Ingresar/Ingresar";
import Inicio from "./pages/Inicio/Inicio";
import PerfilUser from "./pages/PerfilUser/PerfilUser";
import Productos from "./pages/Productos/Productos";
import Registro from "./pages/Registrarte/Registro";
import userActions from "./redux/actions/userActions";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Favoritos from "./pages/Favoritos/Favoritos";
import Success from "./pages/Success/Success";
import Fail from "./pages/Fail/Fail";

const firebaseConfig = {
  apiKey: "AIzaSyC0spyE307eCf3EkhC3tFe39RYoEm1eRTY",
  authDomain: "shoppy-5ff1c.firebaseapp.com",
  projectId: "shoppy-5ff1c",
  storageBucket: "shoppy-5ff1c.appspot.com",
  messagingSenderId: "128159787191",
  appId: "1:128159787191:web:819169fd09020816440532",
  measurementId: "G-59BV0K2QMM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  let { rol, nombre, carrito, favoritos, apellido, logged, token } =
    useSelector((store) => store.userReducer);
  const { reIngress, getDatos } = userActions;
  const dispatch = useDispatch();


  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      dispatch(reIngress(token.token.user));
    }
  }, []);

  useEffect(() => {
    if (logged && token) {
      dispatch(getDatos({ token: token }));
    }
  }, [logged]);

  return (
    <>
      <Routes>
        <Route path="" element={<Bienvenida />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
      <Main>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/admin" element={<Administrador />} />
          <Route path="/perfil" element={<PerfilUser />} />
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
