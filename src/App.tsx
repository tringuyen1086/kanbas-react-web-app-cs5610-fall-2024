import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Github from './Github';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            <Route path="/Github/*" element={<Github />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
