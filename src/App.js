import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Bienvenida from "./pages/Bienvenida/Bienvenida";
import Ingresar from "./pages/Ingresar/Ingresar";
import Inicio from "./pages/Inicio/Inicio";
import Productos from "./pages/Productos/Productos";
import Registro from "./pages/Registrarte/Registro";
import Consultas from "./pages/Consultas/Consultas";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Bienvenida />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
      <Main>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/consultas" element={<Consultas />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
