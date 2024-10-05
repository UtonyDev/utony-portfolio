import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UTonyCalc from './utony-pages/utonycalc/utonycalc';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/utonycalc" element={<UTonyCalc />} />
    </Routes>
  </Router>
);