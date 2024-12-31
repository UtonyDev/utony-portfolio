import React, { useState, useEffect, useRef } from "react";
import './togicon.css'

function Togicon() {

    useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const checkbox = document.getElementById('myCheckbox');
        console.log(prefersDarkMode);

        // If a manual override exists, use it; otherwise, use system preference
        if (savedTheme) {
          document.body.setAttribute('data-theme', savedTheme);
        } else {
          document.body.setAttribute('data-theme', prefersDarkMode ? 'dark' : savedTheme);
        }
        // Set checkbox to true if dark theme is preferred
        if (savedTheme === 'dark' || prefersDarkMode ) { 
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