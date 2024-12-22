import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UWeather from './Pages/utonyweather/uweather';
import UTonyCalc from './Pages/utonycalc/utonycalc';
import UHomePage from './Pages/uhomepage';
import Header from './Components/header';
import Footer from './Components/footer';
import './App.css';

function App() {

  const textAnimations = () => {
      setTimeout( () => {
          const open = window.document.querySelectorAll(".hid");
          const someTxt = document.querySelector('#txt');

          for (let i = 0; i < open.length; i++) {
              open[i].classList.replace("hid", "rev");
          }
      }, 0o0);
  }

  const nameLogoAnimation = () => { 
    window.addEventListener("scroll", () => {
    const currentScrl = window.scrollY;
    const targetElement = document.getElementById("target");
    const triggPoint = targetElement.offsetTop;
    const triggPointX = triggPoint * 1;
    const profNameDesktop = document.getElementById("nme");
    
    if (currentScrl >= triggPointX) {
        profNameDesktop.classList.replace("nmeHide", "nmeShow");
    } else {
        profNameDesktop.classList.replace("nmeShow", "nmeHide");
    }
  } 
    );
  }
  
  return (
    <Router>
      <Header textAnimations={textAnimations} nameLogoAnimation={nameLogoAnimation} />
      <Routes>
        <Route path="*" element={<UHomePage 
          textAnimations={textAnimations} 
          nameLogoAnimation={nameLogoAnimation}
          />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
        <Route path="/uweather" element={<UWeather />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
