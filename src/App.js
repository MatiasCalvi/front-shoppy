import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Bienvenida from "./pages/Bienvenida/Bienvenida";
import Ingresar from "./pages/Ingresar/Ingresar";
import Inicio from "./pages/Inicio/Inicio";
import Productos from "./pages/Productos/Productos";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Bienvenida />} />
        <Route path="/ingresar" element={<Ingresar />} />
      </Routes>
      <Main>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
