import React from "react";
import './togicon.css'

function Togicon() {
    const toggleTheme = (ev) => {
        if (ev.target.checked) {
            document.querySelector('body').setAttribute('data-theme', 'dark')
        } else {
            document.querySelector('body').setAttribute('data-theme', 'light')

        }
    }
    return(
        <>
        <div className="wrapper">
            <label className="switch">
                <input type="checkbox" onChange={toggleTheme}/>
                <span className="slider round"></span>
            </label>
        </div>
        </>
        )
    }
export default Togicon;