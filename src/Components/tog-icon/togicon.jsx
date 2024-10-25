import React, { useState, useEffect, useRef } from "react";
import './togicon.css'

function Togicon() {

    useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const checkbox = document.getElementById('myCheckbox');

        if (savedTheme === 'dark') { 
          checkbox.checked = true;
        }
        // If a manual override exists, use it; otherwise, use system preference
        if (savedTheme) {
          document.body.setAttribute('data-theme', savedTheme);
        } else {
          document.body.setAttribute('data-theme', prefersDarkMode ? 'dark' : savedTheme);
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