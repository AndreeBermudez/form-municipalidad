
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioForm from "./components/InicioForm"; 
import FormPageOne from "./components/FormPageOne"; 
import FormPageInder from "./components/FormPageInder";
import FormPageRepresentante from "./components/FormPageRepresentante";
import FormPageEstablecimiento from "./components/FormPageEstablecimiento";
import FormPageUbicacion from "./components/FormPageUbicacion";
import FormPageDeclaracion from "./components/FormPageDeclaracion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioForm />} />
        <Route path="/form-page-one" element={<FormPageOne />} />
        <Route path="/form-page-inder" element={<FormPageInder />} />
        <Route path="/form-page-representante" element={<FormPageRepresentante />} />
        <Route path="/form-page-establecimiento" element={<FormPageEstablecimiento />} />
        <Route path="/form-page-ubicacion" element={<FormPageUbicacion />} />
        <Route path="/form-page-declaracion" element={<FormPageDeclaracion />} />
      </Routes>
    </Router>
  );
}

export default App;
