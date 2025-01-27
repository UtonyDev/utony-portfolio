import React, { useState, useEffect, useRef } from "react";
import './togicon.css'

function Togicon() {

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const checkbox = document.getElementById('myCheckbox');
        const browserDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

        // If a manual override exists, use it; otherwise, use system preference
        if (savedTheme) {
          if (savedTheme === 'dark') { 
            checkbox.checked = true;
            console.log('checkbox is checked yo!')
          } 
          document.body.setAttribute('data-theme', savedTheme);
        } else { 
          if (browserDarkTheme.matches) {
            document.body.setAttribute('data-theme', 'dark');
            checkbox.checked = true;
            console.log('using browser theme');
          } else {
            document.body.setAttribute('data-theme', 'light')
            checkbox.checked = false;
          }
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