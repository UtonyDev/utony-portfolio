import React from "react";
import { useState, useRef, useEffect } from 'react';
import htmlpic1 from '../assets/htmlpic1.jpg';
import htmlpic2 from '../assets/htmlpic2.png';
import csspic1 from '../assets/csspic1.png';
import csspic2 from '../assets/csspic2.png';
import jssrcpic2 from '../assets/jssrcpic2.png';
import reactsrcpic2 from '../assets/reactsrcpic2.jpg';

function UHomePage( { nameAnimation }) {

  useEffect(() => {
    nameAnimation();
  }, []);  
  
return (
<div className='maincon' >

  <section className="sect-1">
    <div className="custom-shape-divider-bottom-1713287430">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill">   </path>
      </svg>
    </div>

    <div className="cent">
        <div className="hid">
          <span className="gb utxt hid">U</span>
          <span className="utxt">Tony</span>
        </div> 

        <div className="gtxt hid" id="target"  >Junior </div>
        <div className="gtxt hid"> Frontend </div>
        <div className="gtxt hid">Developer </div>
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
        <img srcSet={htmlpic1} width="100%" height="auto" alt=""/>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
     sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      <p className="con cont-2">
        <img srcSet={htmlpic2} width="100%" height="auto" alt=""/>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
     sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      <p className="con cont-3">
        <img srcSet={csspic1} width="100%" height="auto" alt=""/>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
     , pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      <p className="con cont-4">
        <img srcSet={csspic2} width="100%" height="auto" alt=""/>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
     sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      <p className="con cont-5">
        <img srcSet={jssrcpic2} width="100%" height="auto" alt=""/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
        sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      <p className="con cont-6"> 
        <img srcSet={reactsrcpic2} width="100%" height="auto" alt=""/>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugit asperiores, 
        sequi, pariatur quasi fugiat doloribus debitis vero numquam, distinctio reprehenderit. 
      </p>

      </div>
    </div>
  </section>

  </div>
)
  }

  export default UHomePage;