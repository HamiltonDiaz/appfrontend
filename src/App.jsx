import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RecuperacionPage from "./pages/auth/RecuperacionPage";
import RegistroPage from "./pages/auth/RegistroPage";
import Administracion from "./pages/Administracion";
import WithAuth from "./util/WithAuth";
import { useLocalStorage } from "react-use";

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/registro" element={<RegistroPage />}></Route>
          <Route path="/recuperacion" element={<RecuperacionPage />}></Route>
          <Route element={<WithAuth redirectPath='/login' />}>
            <Route path="/" element={<Administracion />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
