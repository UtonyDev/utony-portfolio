import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UTonyCalc from './Pages/utonycalc/utonycalc';
import UHomePage from './Pages/uhomepage';
import Header from './Components/header';
import Footer from './Components/footer';
import './App.css';

function App() {

  const nameAnimation = () => {
    setTimeout( () => {
        const open = window.document.querySelectorAll(".hid");
        for (let i = 0; i < open.length; i++) {
            open[i].classList.replace("hid", "rev");
        }
    }, 0o0);
}


  return (
    <Router>
      <Header nameAnimation={nameAnimation} />
      <Routes>
        <Route path="*" element={<UHomePage nameAnimation={nameAnimation} />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
