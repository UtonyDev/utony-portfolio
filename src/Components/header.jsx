import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaPhoneAlt, FaInfo, FaAddressCard, FaFolder, FaEnvelope, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import Togicon from './tog-icon/togicon';

function Header({ textAnimations, nameLogoAnimation }) {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const pageLocation = useLocation();

// Call the anima function when the component mounts
  useEffect(() => {
    textAnimations(); 
  }, []);  

  const dropdwn = () => {
    const link = document.querySelectorAll(".lnk");
    const morecon = document.querySelectorAll(".morecon");
    const chev = document.querySelectorAll("#chev");


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
                  if (chev[j].getAttribute("class") === "fa-solid fa-chevron-up") {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                  } else {
                      chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                  }
              }
          }
      }
  );
  };
  }

  // Menu function
  const showMenu = () => {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("show");
    dropdwn();
    iconFunct();
  }

  // Desktop hover state functions 
    const handleMouseEnter1 = () => {
      setShowDropdown1(true);
    }; 
    const handleMouseLeave1 = () => {
        setShowDropdown1(false);
      };
    const handleMouseEnter2 = () => {
        setShowDropdown2(true);
    };
    const handleMouseLeave2 = () => {
        setShowDropdown2(false);
    };
  
      const iconFunct = () => {
        const icon = document.getElementById("icn");
      
        if (icon.getAttribute("class") === "fa-solid fa-bars") {
            icon.setAttribute("class","fa-solid fa-xmark");
        } else {
            icon.setAttribute("class","fa-solid fa-bars");
        }
      }
      
      const resetMenu = () => {
        const menu = document.querySelector("#menu");
      
        if (menu.classList.contains("show")){
          menu.setAttribute('class', 'menurev hide');
          iconFunct();
        } 
        const link = document.querySelectorAll(".lnk");
        const morecon = document.querySelectorAll(".morecon");
        const chev = document.querySelectorAll("#chev");
    
        for (let i = 0; i < link.length; i++) {
          link[i].addEventListener("click", () => {
              for (let j = 0; j < morecon.length; j++){ 
                  if (i === j) {
                      morecon[j].classList.toggle("moreconv");
                      if (chev[j].getAttribute("class") === "fa-solid fa-chevron-up") {
                          chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                      } else {
                          chev[j].setAttribute("class", "fa-solid fa-chevron-up");
                      }
                  } else {
                      morecon[j].classList.remove('moreconv');
                      if (chev[j].getAttribute("class") === "fa-solid fa-chevron-up") {
                          chev[j].setAttribute("class", "fa-solid fa-chevron-down");
                      } else {
                          chev[j].setAttribute("class", "fa-solid fa-chevron-up");
                      }
                  }
              }
          }
      );
      };
    
      }

  const calcLogo = () => {
    if (pageLocation.pathname === '/utonycalc' || pageLocation.pathname === '/uweather') {
    const profNameDesktop = document.getElementById("nme");
    const menu = document.querySelector("#menu");

    menu.classList.add('menupc-calc');
    profNameDesktop.classList.replace("nmeHide", "nmeShow");
  } else {
    menu.classList.remove('menupc-calc');
  }}
  useEffect(() => {calcLogo();}, [calcLogo]);

  useEffect(() => {
    nameLogoAnimation();
  }, [nameLogoAnimation]);

  const scrlToProjects = () => {
    const scrlButn = document.querySelector('.skills-section');
    scrlButn.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'  }); 
  }


    return (
        <>
      <div className="headcon">
        <div className="headr">
          
  <span id="nme" className="nmeHide nmePosit font-normal">
    <span className="gb hid">U</span>Tony
  </span>

  <span id="themeIcon"> <Togicon /> </span>
  <i className="fa-solid fa-bars" onClick={showMenu} id="icn"> </i> 
</div>

<div id='menu' className="menurev menupc hide">

<div className="menu-items-con w-full grid md:place-items-baseline md:place-content-center md:shadow-lg lg:shadow-none">

    <Link to="/UHomepage" className=' ps-3 text-2xl lg:text-xs'onClick={resetMenu} >
       Home
    </Link>

  <div className="dropdown" onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1} >
    <a className="lnk text-2xl lg:text-xs" >
       Projects <i className="fa-solid fa-chevron-down" id="chev"></i>
    </a>
    <div className={`morecon ${
      showDropdown1 ? 'moreconv' : ''}`
      } >
      <Link to="/utonycalc" className="more text-base lg:text-xs" onClick={resetMenu} > UTony Calc <hr /></Link> 
      <Link to="/uweather" className="more text-base lg:text-xs" onClick={resetMenu}> UWeather <hr /></Link>
    </div>
  </div>

  <div className="dropdown" onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
    <a className="lnk text-2xl lg:text-xs" >
       Contact <i className="fa-solid fa-chevron-down" id="chev"></i>
    </a>
    <div className={`morecon  ${
      showDropdown2 ? 'moreconv' : ''}`} >
      <a href="https://linkedin.com/in/tonyudoye" className="more text-base lg:text-xs " target="_blank">
        <i className="fa-brands fa-linkedin"></i> LinkedIn
        <hr />
      </a>
      <a href="https://twitter.com/UTonyDev" className="more text-base lg:text-xs " target="_blank">
        <i className="fa-brands fa-twitter"></i> Twitter 
        <hr />
      </a>
      <a href="https://github.com/UTonyDev" className="more text-base lg:text-xs ">
        <i className="fa-brands fa-github"></i> Github 
        <hr />
      </a>
      <a href="https://utonydev@gmail.com" className="more text-base lg:text-xs " target="_blank">  
        <i className="fa-solid fa-envelope"></i> Email  
        <hr />
      </a>
    </div>
    </div>
 

  <Link onClick={scrlToProjects} className="lnk text-2xl lg:text-xs">
     About
  </Link>
  </div>
</div>
</div>

<div className="scrlStatus">   </div>

</>
    );
}

export default Header;
