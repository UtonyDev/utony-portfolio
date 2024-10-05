import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Togicon from './tog-icon/togicon';
import './app.css';

function App() {

  const anima = () => {window.addEventListener("load", function() {
    setTimeout( () => {
        const open = this.document.querySelectorAll(".hid");
        for (let i = 0; i < open.length; i++) {
            open[i].classList.replace("hid", "rev");
        }
    }, 0o0);
}) 
}
anima();

const iconFunct = () => {
  const icon = document.getElementById("icn");

  if (icon.getAttribute("class") === "fa-solid fa-bars") {
      icon.setAttribute("class","fa-solid fa-xmark");
  } else {
      icon.setAttribute("class","fa-solid fa-bars");
  }
}

const resetOptions = () => {
  const link = document.querySelectorAll(".lnk");
  const morecon = document.querySelectorAll(".morecon");
  const chev = document.querySelectorAll("#chev");

  for (let i = 0; i < link.length; i++) {
    morecon[i].setAttribute("class", "morecon");
    for (let k = 0; k < chev.length; k++) {
    if (chev[k].classList.contains("fa-solid fa-chevron-up")) {
        chev[k].setAttribute("class", "fa-solid fa-chevron-down");
        chev[k].setAttribute("class", "fa-solid fa-chevron-down");}
    }
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



const showMenu = () => {
  const menu = document.querySelector("#menurev");
  const bdy = document.querySelector(".maincon");
  const link = document.querySelectorAll(".lnk");
  const morecon = document.querySelectorAll(".morecon");
  const chev = document.querySelectorAll("#chev");

  menu.classList.toggle("show");
  bdy.classList.toggle("blr");
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
  resetOptions();
}

  return (

       <div className='home' >
         <div className="headr">
           <span id="nme" className="nmeHid nmePosit">
             <span className="gb hid">U</span>Tony
           </span>
           <span id="themeIcon"> <Togicon /> </span>
           <i className="fa-solid fa-bars" onClick={showMenu} id="icn">   </i> 
         </div>

    <div id="menurev" className="drop">

      <div className="profpic">
         <img srcSet="" alt="" /> imgimgimg 
      </div>

      <div className="dropdown">
        <a className="lnk">
        <span id="slsh">/</span> Projects <i className="fa-solid fa-chevron-down" id="chev"></i>
        </a>
        <div className="morecon">
          <a href="" className="more">
          <Link to="/utonycalc">UTony Calc</Link> <hr />
          </a>
          <a href="" className="more">
            Work 2 <hr />
          </a>
          <a href="" className="more">
            Work 3 <hr />
          </a>
        </div>
      </div>

      <div className="dropdown">
        <a className="lnk">
          <span id="slsh">/</span> Contact <i className="fa-solid fa-chevron-down" id="chev"></i>
        </a>
        <div className="morecon">
          <a href="" className="more">
            <i className="fa-solid fa-envelope"></i> udoyetony@gmail.com <hr />
          </a>
          <a href="" className="more">
            <i className="fa-brands fa-twitter"></i> Twitter <hr />
          </a>
          <a href="" className="more">
            <i className="fa-brands fa-github"></i> Github <hr />
          </a>
          <a href="" className="more">
            <i className="fa-brands fa-whatsapp"></i> Whatsapp <hr />
          </a>
        </div>
      </div>

      <a href="#myinfo" className="lnk">
        <span id="slsh">/</span> About
      </a>
      <div className="morecon"></div> 
    </div>

    <div className="scrlStatus">   </div>

    <div className='maincon' onClick={resetMenu} >
  <div className="innercon">

    <section className="sect-1">
      <div className="custom-shape-divider-bottom-1713287430">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill">   </path>
        </svg>
      </div>

      <div className="cent">
        <div className="utxt">
        <div id="txt" className="hid gtxt">
          <span className="gb txt hid">U</span>Tony
        </div>
        <div className="gtxt hid" id="target">Junior   </div>
        <div className="gtxt hid"> Frontend </div>
        <div className="gtxt hid">Developer </div>
      </div>
      </div>
    </section>

    <section className="sect-2">
      <div className="cent">

        <div id="txt" className="gb"> 
        I craft user-centric websites optimized for all devices and adhering to modern standards.
        </div>
      <div className="scrl">
        <a href="#jump">   <i className="fa-solid fa-arrow-down">   </i> Scroll    </a>
      </div>
    </div>
    </section>

    <section className="sect-3" id="jump"> 
      <div className="cent">
      <div className="projcon" id="txt">
        <p className="con cont-1">
          <img srcSet="" width="100%" height="auto" alt=""/>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
       sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        <p className="con cont-2">
          <img srcSet="" width="100%" height="auto" alt=""/>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
       sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        <p className="con cont-3">
          <img srcSet="" width="100%" height="auto" alt=""/>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
       , pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        <p className="con cont-4">
          <img srcSet="" width="100%" height="auto" alt=""/>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
       sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        <p className="con cont-5">
          <img srcSet="" width="100%" height="auto" alt=""/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
          sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        <p className="con cont-6"> 
          <img srcSet="" width="100%" height="auto" alt=""/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
          sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
        </p>

        </div>
      </div>
       </section>

    </div>
    <div className="foot">
         <div className="sock">
         <i className="fa-solid fa-envelope">   </i>
         <i className="fa-brands fa-twitter">   </i>
         <i className="fa-brands fa-whatsapp">   </i>
         <i className="fa-brands fa-github">   </i>   </div>
           <div id="leg"> Design by <span className="gb">U</span>Tony</div>
       </div>


    </div>
   </div>
  );
}

export default App;