import React from 'react';
import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub, 
  FaUserCircle, FaInfoCircle,  FaFolderOpen, FaCogs} from 'react-icons/fa';


function Footer() {
  return (
<>
    
  <div className="foot">
      
      <div className="contact-link">
        <h1 className="contact-head"> Contacts </h1>

        <div className="contact-links">
          <FaEnvelope style={{ 
            marginRight: '2%', height: '1.2em', 
            width: '1.2em', strokeWidth: 2 }}/>
          utonydev@gmail.com
        </div>
        <div className="contact-links">
          <FaTwitter style={{ 
            marginRight: '2%', height: '1.2em', 
            width: '1.2em', strokeWidth: 2 }}/>
          twitter.com/UtonyDev 
        </div>
        <div className="contact-links">
          <FaLinkedin style={{ 
            marginRight: '2%', height: '1.2em', 
            width: '1.2em', strokeWidth: 2 }}/>
          linkedin.com/UtonyDev
        </div>
        <div className="contact-links">
          <FaGithub style={{ 
            marginRight: '2%', height: '1.2em', 
            width: '1.2em', strokeWidth: 2 }}/> 
          github.com/UtonyDev
        </div>
      </div>

      <div className="quick-links">
        <h1 className="quicklink-head"> Quick Links </h1>

        <div className="section-links">
          <FaUserCircle/>
            Hero Section
          </div>
        <div className="section-links">
          <FaInfoCircle/>
            About
        </div>
        <div className="section-links">
          <FaFolderOpen/>
            Project
        </div>
        <div className="section-links">
          <FaCogs/>
            Skills
        </div>
      </div>

    <div id="leg"> 
    © 2024 Design by <span className="gb">U</span>Tony

    </div>

  </div>
  </>
  )
}

export default Footer;