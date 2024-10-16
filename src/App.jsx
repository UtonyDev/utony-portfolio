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
const nmeAnima = () => { 
  window.addEventListener("scroll", () => {
  const currentScrl = window.scrollY;
  const targetElement = document.getElementById("target");
  const triggPoint = targetElement.offsetTop;
  const triggPointX = triggPoint * 1;
  const nmeDesc = document.getElementById("nme");
  
  if (currentScrl >= triggPointX) {
      nmeDesc.classList.replace("nmeHide", "nmeShow");
  } else {
      nmeDesc.classList.replace("nmeShow", "nmeHide");
  }
} 
  );
} 

  return (
    <Router>
      <Header nameAnimation={nameAnimation} nmeAnima={nmeAnima} />
      <Routes>
        <Route path="*" element={<UHomePage nameAnimation={nameAnimation} nmeAnima={nmeAnima} />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
