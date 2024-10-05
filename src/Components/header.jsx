import React from 'react';
import { Link } from 'react-router-dom';
import Togicon from './tog-icon/togicon';


function Header() {

    const showMenu = () => {
        const menu = document.querySelector("#menurev");
        const bdy = document.querySelector(".maincon");
        const link = document.querySelectorAll(".lnk");
        const morecon = document.querySelectorAll(".morecon");
        const chev = document.querySelectorAll("#chev");
      
        menu.classList.toggle("show");
        
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
                      if (chev[i].getAttribute("class") === "fa-solid fa-chevron-up") {
                          chev[i].setAttribute("class", "fa-solid fa-chevron-down");
                      } else {
                          chev[i].setAttribute("class", "fa-solid fa-chevron-down");
                      }
                  }
              }
          }
      );
      };
        iconFunct();
      }

      const iconFunct = () => {
        const icon = document.getElementById("icn");
      
        if (icon.getAttribute("class") === "fa-solid fa-bars") {
            icon.setAttribute("class","fa-solid fa-xmark");
        } else {
            icon.setAttribute("class","fa-solid fa-bars");
        }
      }
      
      const resetMenu = () => {
        const menu = document.querySelector("#menurev");
        const bdy = document.querySelector(".maincon");
      
        if (menu.classList.contains("show")){
          menu.setAttribute('class', 'drop');
          bdy.setAttribute('class', 'maincon');
          iconFunct();
        } 
      }
      
      

    return (
        <>
        <div className="headr">
  <span id="nme" className="nmeHid nmePosit">
    <span className="gb hid">U</span>Tony
  </span>
  <span id="themeIcon"> <Togicon /> </span>
  <i className="fa-solid fa-bars" onClick={showMenu} id="icn"> </i> 
</div>

<div className="scrlStatus">   </div>

<div id="menurev" className="drop">

  <Link to="/UHomePage" className="profpic" onClick={resetMenu}>
    <img src="" alt="Profile Picture" />  {/* Add a valid image source */}
  </Link>

  <div className="dropdown">
    <Link to="/" className="lnk" >
      <span id="slsh">/</span> Projects <i className="fa-solid fa-chevron-down" id="chev"></i>
    </Link>
    <div className="morecon">
      <Link to="/utonycalc" className="more" onClick={resetMenu}>UTony Calc</Link> <hr />
      <Link to="/work2" className="more">Work 2</Link> <hr />
      {/* ... other links ... */}
    </div>
  </div>

  <div className="dropdown">
    <Link to="/contact" className="lnk">
      <span id="slsh">/</span> Contact <i className="fa-solid fa-chevron-down" id="chev"></i>
    </Link>
    <div className="morecon">
      <a href="mailto:udoyetony@gmail.com" className="more">
        <i className="fa-solid fa-envelope"></i> udoyetony@gmail.com <hr />
      </a>
      <a href="https://twitter.com/" className="more">
        <i className="fa-brands fa-twitter"></i> Twitter <hr />
      </a>
      {/* ... other links ... */}
    </div>
  </div>

  <Link to="/about" className="lnk">
    <span id="slsh">/</span> About
  </Link>
  {/* Remove empty div if not needed */}
</div>
</>
    );
}

export default Header;
