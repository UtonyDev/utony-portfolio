import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import UTonyCalc from './Pages/utonycalc/utonycalc';
import UHomePage from './Pages/uhomepage';
import Header from './Components/header';
import Footer from './Components/footer';
import './App.css';

function App() {
    
  return (
<Router basename="/utony-portfolio">
      <Header />
      <Routes>
        <Route path="*" element={<UHomePage  />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;