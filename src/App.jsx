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
const nameLogoAnimation = () => { 
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

const cardsAnimation = () => { 
  window.addEventListener("scroll", () => {
    const currentScrl = window.scrollY;
    const targetElement = document.getElementById("scrlTarget");
    const triggPoint = targetElement.offsetTop;
    const triggPointX = triggPoint;
    const cards = document.querySelectorAll(".cardCont");
    console.log(cards);

    for (let j = 0; j < cards.length; j++) {
      if (currentScrl >= triggPointX) {
        cards[j].classList.replace("hideCards", "showCards");
      } else {
        cards[j].classList.replace("showCards", "hideCards");
      }
    } 
  });
} 


  return (
    <Router>
      <Header nameAnimation={nameAnimation} nameLogoAnimation={nameLogoAnimation} />
      <Routes>
        <Route path="*" element={<UHomePage 
          nameAnimation={nameAnimation} 
          nameLogoAnimation={nameLogoAnimation} 
          cardsAnimation={cardsAnimation}
          />} />
        <Route path="/utonycalc" element={<UTonyCalc />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
