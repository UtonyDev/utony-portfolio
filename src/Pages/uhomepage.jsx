import React from "react";
import { useState, useRef, useEffect } from 'react';
import utonycalcpic from '../assets/utonycalcpic.png';
import htmlpic2 from '../assets/htmlpic2.png';
import csspic1 from '../assets/csspic1.png';
import csspic2 from '../assets/csspic2.png';
import jssrcpic2 from '../assets/jssrcpic2.png';
import reactsrcpic2 from '../assets/reactsrcpic2.jpg';
import { Link } from "react-router-dom";
import 'intersection-observer';

function UHomePage( { textAnimations }) {

  useEffect(() => {
    textAnimations();
  }, []); 

// Select all sections
useEffect(() => {
  const contents = document.querySelectorAll('.elements');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-contents');
        entry.target.classList.remove('hide-contents');
      } else {
        entry.target.classList.add('hide-contents');
        entry.target.classList.remove('reveal-contents');
      }
    });
  });

  contents.forEach((element) => observer.observe(element));

  // Cleanup to avoid memory leaks
  return () => observer.disconnect();
}, []);


return (
  <>
<div className='maincon' >

  <section className="sect-1 hero-sect">
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

      <div id="txt" className="elements hide-contents gb"> 
      I craft user-centric websites optimized for all devices
       and adhering to modern standards.
      </div>

    <div id='scrlTarget' className="scrl"> 
      <a href="#jump"> <i className="fa-solid fa-arrow-down"> </i> Scroll  </a>
    </div>
  </div>
  </section>

  <section className="skills-section">
    <div className="cent">
      <h1 className="skills-title gtxt elements hide-contents"> Skills </h1>

      <div className="tech-stacks"> 
        <div className="stacks elements hide-contents"> <img className="stack-imgs" src="htmllogo.webp" alt="" srcSet="" /> HTML </div>
        <div className="stacks elements hide-contents"> 
          <img className="stack-imgs" src="csslogo.webp" alt="" srcSet="" /> CSS </div>
        <div className="stacks elements hide-contents"> 
          <img className="stack-imgs" src="javascriptlogo.webp" alt="" srcSet="" /> JavaScript </div>
        <div className="stacks elements hide-contents"> 
          <img className="stack-imgs" src="reactlogo.webp" alt="" srcSet="" /> React </div>
        <div className="stacks elements hide-contents"> 
          <img className="stack-imgs" src="tailwindlogo.webp" alt="" srcSet="" /> TailWind </div>
        <div className="stacks elements hide-contents"> 
          <img className="stack-imgs" src="npmlogo.webp" alt="" srcSet="" /> npm </div>
      </div>
    </div>
  </section>

  <section className="sect-3" id="jump"> 
    <div className="cent">  
      <h1 className="projt gtxt elements hide-contents"> Projects </h1>

      <div className="projcon" id="txt">
      <Link className="cardCont elements hide-contents" to="/utonycalc" >
        <img srcSet={utonycalcpic} width="100%" height="auto" alt=""/>
        <h1 className="projTitle"> Calculator App </h1>
        <span className="descr">
        A responsive calculator built with React.
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>
      </Link>

      <p className="cardCont elements hide-contents">
        <img srcSet={htmlpic2} width="100%" height="auto" alt=""/>
        <span className="descr">
        <span className="projTitle"> Coming Soon </span>
        <span className="descr">
         Project in progress...
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>     
        </span> 
      </p>

      <p className="cardCont elements hide-contents">
        <img srcSet={csspic1} width="100%" height="auto" alt=""/>
        <span className="descr">
        <span className="projTitle"> Coming Soon </span>
        <span className="descr">
         Project in progress...
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>     
        </span> 
      </p>

      <p className="cardCont elements hide-contents">
        <img srcSet={csspic2} width="100%" height="auto" alt=""/>
        <span className="descr">
        <span className="projTitle"> Coming Soon </span>
        <span className="descr">
         Project in progress...
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>     
        </span> 
      </p>

      <p className="cardCont elements hide-contents">
        <img srcSet={jssrcpic2} width="100%" height="auto" alt=""/>
        <span className="descr">
        <span className="projTitle"> Coming Soon </span>
        <span className="descr">
         Project in progress...
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>     
        </span> 
      </p>

      <p className="cardCont elements hide-contents"> 
        <img srcSet={reactsrcpic2} width="100%" height="auto" alt=""/>
        <span className="descr">
        <span className="projTitle"> Coming Soon </span>
        <span className="descr">
         Project in progress...
        </span> 
        <span className="langs"> ∘ HTML </span>
        <span className="langs"> ∘ CSS </span>
        <span className="langs"> ∘ React </span>     
        </span> 
      </p>

      </div>
    </div>

  </section>
  </div>
  </>
)
  }

  export default UHomePage;