import React, { useState, useEffect, useRef } from "react";
import './togicon.css'

function Togicon() {

    useEffect(() => {
        // Check for saved theme in localStorage
        //
       // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        //const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        //console.log(prefersDarkMode);

        const savedTheme = localStorage.getItem('theme');
        const checkbox = document.getElementById('myCheckbox');

        if (savedTheme === 'dark') { 
          checkbox.checked = true;
          console.log('checkbox is checked yo!')
        } 

        // If a manual override exists, use it; otherwise, use system preference
        if (savedTheme) {
          document.body.setAttribute('data-theme', savedTheme);
         
        } 
        if (savedTheme === 'dark') { 
          checkbox.checked = true;
          console.log('checkbox is checked yo!')
        } 
        
      }, [window.load]);

  
    const toggleTheme = (ev) => {
const newTheme = ev.target.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save manual override
  };

    return(
        <>
        <div className="wrapper">
            <label className="switch">
                <input type="checkbox" id="myCheckbox" onChange={toggleTheme} />
                <span className="slider round"></span>
            </label>
        </div>
        </>
        )
    }
export default Togicon;