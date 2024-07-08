import React, { useState } from 'react';
import './Nav-foot.css'; 
import logo from './logo.png';
import { Link } from 'react-router-dom';

function Nav() {
  const [isServicesHovering, setIsServicesHovering] = useState(false);

  const dropdownStyles = {
    dropdown: {
      display: isServicesHovering ? 'block' : 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      minWidth: '160px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1,
    },
    dropdownItem: {
      color: 'black',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
    },
  };

  return (
    <>
    {/* <nav className="navbar">
                <div className="left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="right">
                    <ul className="navbar-list">
                        <li className="navbar-item"><Link to="/">Home</Link></li>
                        <li className="navbar-item"><Link to="/about">About</Link></li>
                        <li className="navbar-item"><Link to="/services">Services</Link></li>
                        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
                        <li className="navbar-item"><Link to="/part">Part</Link></li>
                    </ul>
                </div>
            </nav> */}
            

      <nav className="navbar">
        <div className="left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="right">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/">Home</Link></li>
            <li className="navbar-item"><Link to="/about">About</Link></li>
            <li className="navbar-item"
                onMouseEnter={() => setIsServicesHovering(true)}
                onMouseLeave={() => setIsServicesHovering(false)}
            >
              <Link to="/services">Services</Link>
              <div style={dropdownStyles.dropdown} className="dropdown">
                <Link to="/services/web-development" style={dropdownStyles.dropdownItem}>Web Development</Link>
                <Link to="/services/mobile-apps" style={dropdownStyles.dropdownItem}>Mobile Apps</Link>
                <Link to="/services/cloud-solutions" style={dropdownStyles.dropdownItem}>Cloud Solutions</Link>
                <Link to="/services/consulting" style={dropdownStyles.dropdownItem}>Consulting</Link>
              </div>
            </li>
            <li className="navbar-item"><Link to="/contact">Contact</Link></li>
            <li className="navbar-item"><Link to="/part">Part</Link></li>
          </ul>
        </div>
      </nav>

    </>
  );
}

export default Nav;