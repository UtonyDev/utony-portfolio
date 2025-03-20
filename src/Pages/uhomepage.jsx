import React from "react";
import { useState, useRef, useEffect } from 'react';
import utonycalcpic from '../assets/utonycalcpic.png';
import csspic1 from '../assets/csspic1.png';
import csspic2 from '../assets/csspic2.png';
import jssrcpic2 from '../assets/jssrcpic2.png';
import reactsrcpic2 from '../assets/reactsrcpic2.jpg';
import 'intersection-observer';
import { FaArrowDown } from "react-icons/fa";

function UHomePage( { textAnimations }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message sent successfully!");
  }

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

const scrollToProjects = () => {
  const projectSection = document.querySelector('.projt');

  projectSection.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
};

return (
  <>
<div className='maincon' >

  <section className="sect-1 hero-sect">
    <div className="custom-shape-divider-bottom-1713287430">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill">   </path>
      </svg>
    </div>

    <div className="cent ">
        <div className="hid">
          <span className="gb utxt hid">U</span>
          <span className="utxt">Tony</span>
        </div> 

        <div className="gtxt hid text-gradient" id="target"  >Junior </div>
        <div className="gtxt hid text-gradient"> Frontend </div>
        <div className="gtxt hid text-gradient">Developer </div>
    </div>
  </section>

  <section className="sect-2">
    <div className="cent">

      <div id="txt" className="elements hide-contents gb"> 
      I craft user-centric websites optimized for all devices
       and adhering to modern standards.
      </div>

    <div id='scrlTarget' className="scrl" onClick={scrollToProjects}>  
      <a> <FaArrowDown/> Scroll </a>
    </div>
  </div>
  </section>

  <section className="skills-section">
    <div className="cent">
      <h1 className="skills-title gtxt elements hide-contents"> Skills </h1>

      <div className="tech-stacks"> 
        <div className="stacks elements"> <img className="stack-imgs" src="htmllogo.webp" alt="" srcSet="" /> HTML </div>
        <div className="stacks elements"> 
          <img className="stack-imgs" src="csslogo.webp" alt="" srcSet="" /> CSS </div>
        <div className="stacks elements"> 
          <img className="stack-imgs" src="javascriptlogo.webp" alt="" srcSet="" /> JavaScript </div>
        <div className="stacks elements"> 
          <img className="stack-imgs" src="reactlogo.webp" alt="" srcSet="" /> React </div>
        <div className="stacks elements"> 
          <img className="stack-imgs" src="tailwindlogo.webp" alt="" srcSet="" /> TailWind </div>
        <div className="stacks elements"> 
          <img className="stack-imgs" src="npmlogo.webp" alt="" srcSet="" /> npm </div>
      </div>
    </div>
  </section>

  <section className="sect-3" id="jump"> 
    <div className="cent">  
      <h1 className="projt gtxt elements hide-contents"> Projects </h1>

      <div className="project-section" id="txt">

      <div className="card-item row-auto rounded-md hover:shadow-2xl grid place-items-baseline">
        <img  src={utonycalcpic}  width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> React-Powered Calculator </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
        A modern, fully responsive calculator that works seamlessly across all devices, built with React and Tailwind CSS.
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">HTML</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">CSS</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="https://utony-calculator-app.vercel.app/" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="https://github.com/UtonyDev/utony-calculator-app" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>     
        </div>

      <div className="card-item row-auto rounded-md  hover:shadow-2xl grid place-items-baseline">
        <img srcSet='u-weather-img.png' width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> Smart Weather App </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
        A fully responsive weather app powered by React and Visual Crossing API, featuring automatic updates, real-time weather forecasts, and a search functionality for location-based weather data.
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">Tailwind</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">Nodejs</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="https://utony-weather-app.vercel.app/" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="https://github.com/UtonyDev/utony-weather-app" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>     
        </div>

      <div className="card-item row-auto rounded-md  hover:shadow-2xl grid place-items-baseline">
        <img srcSet={csspic1} width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> Coming Soon </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
         Project in progress...
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">HTML</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">CSS</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="#" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="#" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>    
      </div>

      <div className="card-item row-auto rounded-md  hover:shadow-2xl grid place-items-baseline">
        <img srcSet={csspic2} width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> Coming Soon </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
         Project in progress...
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">HTML</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">CSS</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="#" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="#" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>    
      </div>

      <div className="card-item row-auto rounded-md  hover:shadow-2xl grid place-items-baseline">
        <img srcSet={jssrcpic2} width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> Coming Soon </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
         Project in progress...
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">HTML</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">CSS</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="#" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="#" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>    
      </div>

      <div className="card-item row-auto rounded-md  hover:shadow-2xl grid place-items-baseline"> 
        <img srcSet={reactsrcpic2} width="100%" className="w-full h-40 rounded-t-md" alt="Project Preview"/>
        <span className="card-title text-lg font-medium px-2 mt-3 ms-4"> Coming Soon </span>
        <span className="card-description break-normal px-2 text-sm mt-2 ">
         Project in progress...
        </span> 
        <div className="flex flex-wrap gap-2 mt-3 ms-4">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">HTML</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">CSS</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">React</span>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 ">
          <a href="#" className="site-butn me-3 bg-teal-100 text-teal-600 text-sm px-3 py-1 rounded-lg hover:bg-teal-200 transition-all">Live Demo</a>
          <a href="#" className="border-[0.5px] border-teal-500 text-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-500 hover:text-white transition-all">View Source</a>
        </div>    
      </div>

      </div>
    </div>

  </section>

  <section className="sect-4">
    <div className="cent pb-4">
      <h2 className="title gtxt "> Contact </h2>
      <form onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
        <div>
          <label className="block card-title">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full md:w-1/2 card-item px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block card-title">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full md:w-1/2 card-item px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block card-title">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full md:w-1/2 card-item px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400"
            placeholder="Type your message..."
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-1/2 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  </section>
  </div>
  </>
)
  }

  export default UHomePage;