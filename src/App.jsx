import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RecuperacionPage from "./pages/auth/RecuperacionPage";
import RegistroPage from "./pages/auth/RegistroPage";
import Administracion from "./pages/users/Administracion";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import ResetPassword from "./pages/auth/ResetPassword";
import ProyectoPage from "./pages/proyects/ProyectoPage";
import PoryectoID from "./pages/proyects/PoryectoID";

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
            <Route path="/" element={<Administracion />} index />
            <Route path="/proyectos" element={<ProyectoPage />} />
            <Route path="/proyecto/:id" element={<PoryectoID />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
