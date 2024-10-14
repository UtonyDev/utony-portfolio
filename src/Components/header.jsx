import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Togicon from './tog-icon/togicon';

function Header({ nameAnimation }) {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const pageLocation = useLocation();

  useEffect(() => {
    nameAnimation(); // Call the anima function when the component mounts
  }, []);  


  const dropdwn = () => {
    const link = document.querySelectorAll(".lnk");
    const morecon = document.querySelectorAll(".morecon");
    const chev = document.querySelectorAll("#chev");


    for (let i = 0; i < link.length; i++) {
      link[i].addEventListener("click", () => {
          for (let j = 0; j < morecon.length; j++){ 
              if (i === j) {
                  morecon[j].classList.toggle("moreconv");
                  if (chev[j].getAttribute("class") === "fa-solid fa-chevron-down") {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-up");
                  } else {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                  }
              } else {
                  morecon[j].classList.remove('moreconv');
                  if (chev[j].getAttribute("class") === "fa-solid fa-chevron-up") {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                  } else {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                  }
              }
          }
      }
  );
  };
  }

  const showMenu = () => {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("show");

    dropdwn();
    iconFunct();
  }

    const handleMouseEnter1 = () => {
      setShowDropdown1(true);
    };
      
    const handleMouseLeave1 = () => {
      setShowDropdown1(false);
    };
    const handleMouseEnter2 = () => {
      setShowDropdown2(true);
    };
  
    const handleMouseLeave2 = () => {
      setShowDropdown2(false);
    };

      const iconFunct = () => {
        const icon = document.getElementById("icn");
      
        if (icon.getAttribute("class") === "fa-solid fa-bars") {
            icon.setAttribute("class","fa-solid fa-xmark");
        } else {
            icon.setAttribute("class","fa-solid fa-bars");
        }
      }
      
      const resetMenu = () => {
        const menu = document.querySelector("#menu");
        const bdy = document.querySelector(".maincon");
      
        if (menu.classList.contains("show")){
          menu.setAttribute('class', 'hide');
          bdy.setAttribute('class', 'maincon');
          iconFunct();
        } 
      }

    const nmeAnima = () => { window.addEventListener("scroll", () => {
      if (pageLocation.pathname === '/') {
        const currentScrl = window.scrollY;
        const targetElement = document.getElementById("target");
        const triggPoint = targetElement.offsetTop;
        const triggPointX = triggPoint * 4;
        const nmeDesc = document.getElementById("nme");
        
        if (currentScrl > triggPointX) {
            nmeDesc.classList.replace("nmeHide", "nmeShow");
        } else {
            nmeDesc.classList.replace("nmeShow", "nmeHide");
        }
    } else {
      const nmeDesc = document.getElementById("nme");

          nmeDesc.classList.replace("nmeHide", "nmeShow");
          console.log("youre in calc");
        }
  }
);
} 
nmeAnima();

const calcLogo = () => {
  if (pageLocation.pathname === '/utonycalc') {
  const nmeDesc = document.getElementById("nme");

    nmeDesc.classList.replace("nmeHide", "nmeShow");
    console.log("youre in calc")
}}
useEffect(() => {calcLogo();}, []);

    return (
        <>
      <div className="headcon">
        <div className="headr">
          
  <span id="nme" className="nmeHide nmePosit">
    <span className="gb hid">U</span>Tony
  </span>

  <span id="themeIcon"> <Togicon /> </span>
  <i className="fa-solid fa-bars" onClick={showMenu} id="icn"> </i> 
</div>

<div id='menu' className="menurev menupc hide">

  <Link to="/UHomePage" className="profpic" >
    <img src="" alt="Profile Picture" />  {/* Add a valid image source */}
  </Link>

  <div className="dropdown" onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1} >
    <a className="lnk" >
      <span id="slsh">/</span> Projects <i className="fa-solid fa-chevron-down" id="chev"></i>
    </a>
    <div className={`morecon ${showDropdown1 ? 'moreconv' : ''}`} >
      <Link to="/utonycalc" className="more" onClick={resetMenu}>UTony Calc <hr /></Link> 
      <Link to="/work2" className="more">Work 2  <hr /></Link>
      {/* ... other links ... */}
    </div>
  </div>

  <div className="dropdown" onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
    <a className="lnk" >
      <span id="slsh">/</span> Contact <i className="fa-solid fa-chevron-down" id="chev"></i>
    </a>
    <div className={`morecon ${showDropdown2 ? 'moreconv' : ''}`} >
      <a href="https://twitter.com/" className="more">
        <i className="fa-brands fa-twitter"></i> Twitter <hr />
      </a>
      <a href="udoyetony@gmail.com" className="more">  
      <i className="fa-solid fa-envelope"></i> GMail  <hr />
      </a>
    </div>
  </div>

  <Link to="/about" className="lnk">
    <span id="slsh">/</span> About
  </Link>
  {/* Remove empty div if not needed */}
</div>
</div>

<div className="scrlStatus">   </div>

</>
    );
}

export default Header;
