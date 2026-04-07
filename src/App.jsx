import { useState } from "react";
import "./App.css";
import GeminiPLD from "./componentes/dashboard/GeminiPLD";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionalProfileApp from "./componentes/transacional/TransactionalProfileApp";
import PLDScreens from "./componentes/formularios/PLDScreens";
import ConfigurarPlantilla from "./componentes/configuracion_excel/ConfigurarPlantilla";
import ImportarPasos from "./componentes/configuracion_excel/pasos_prueba/ImportarPasos";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const VALID_USER = "admin";
  const VALID_PASS = "prueba2024";

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === VALID_USER && pass === VALID_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas. Intenta con admin / prueba2024");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario de prueba"
            onChange={(e) => setUser(e.target.value)}
            style={{ padding: '8px' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeminiPLD />} />
        <Route path="/transactional/new" element={<PLDScreens />} />
        <Route path="/importar" element={<ConfigurarPlantilla />} />
        <Route path="/importar/pasos" element={<ImportarPasos />} />
      </Routes>
    </Router>
  );
}

export default App;