import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to Web Dev</h1>
      <h2>Tri Nguyen</h2>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
