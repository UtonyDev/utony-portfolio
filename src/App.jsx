import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import UTonyCalc from './Pages/utonycalc/utonycalc';
import UHomePage from './Pages/uhomepage';
import Header from './Components/header';
import Footer from './Components/footer';
import './app.css';

function App() {

  const anima = () => {
    setTimeout( () => {
        const open = window.document.querySelectorAll(".hid");
        for (let i = 0; i < open.length; i++) {
            open[i].classList.replace("hid", "rev");
        }
    }, 0o0);
}

useEffect(() => {
  anima();  // Call the anima function when the component mounts
}, []);  

  return (
<Router basename="/utony-portfolio">
      <Header />
      <Routes>
        <Route path="*" element={<UHomePage />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;