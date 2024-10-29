import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RecuperacionPage from "./pages/auth/RecuperacionPage";
import RegistroPage from "./pages/auth/RegistroPage";
import Administracion from "./pages/Administracion";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import ResetPassword from "./pages/auth/ResetPassword";
import AdministracionProyecto from "./components/AdministracionProyecto";
import ProyectPage from "./pages/proyects/ProyectPage";

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />} >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/recuperacion" element={<RecuperacionPage />} />
            <Route path="/recuperacion/:token" element={<ResetPassword />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/proyectos" element={<AdministracionProyecto />} />
            <Route path="/proyecto" element={<ProyectPage />} />
            <Route path="/" element={<Administracion />} index />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
