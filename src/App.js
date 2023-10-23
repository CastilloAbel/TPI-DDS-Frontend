import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import  Inicio  from "./components/Inicio";
import { Albumes } from "./components/albumes/Albumes";
import { Jugadores } from "./components/jugadores/Jugadores"
import Autos from './components/autos/Autos.jsx';
import { Peliculas } from "./components/peliculas/Peliculas";
function App() {
  return (
    <>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/albumes" element={<Albumes/>} />
              <Route path="/autos" element={<Autos />} />
              <Route path="/jugadores" element={<Jugadores/>} />
              <Route path="/peliculas" element={<Peliculas/>} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}
export default App;
