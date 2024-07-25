import React, { useState, useEffect } from 'react';
import './Nav-foot.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Nav() {
  const [isServicesHovering, setIsServicesHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavContent = () => (
    <ul className="navbar-list text-with-borders">
      <li className="navbar-item letter">
        <Link className="letter" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
      </li>
      <li className="navbar-item services-dropdown">
        <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
        {(windowWidth <= 768 || isServicesHovering) && (
          <div className="dropdown">
            <Link to="/services/web-development" onClick={() => setIsMobileMenuOpen(false)}>Web Development</Link>
            <Link to="/services/mobile-apps" onClick={() => setIsMobileMenuOpen(false)}>Mobile Apps</Link>
            <Link to="/services/cloud-solutions" onClick={() => setIsMobileMenuOpen(false)}>Cloud Solutions</Link>
            <Link to="/services/consulting" onClick={() => setIsMobileMenuOpen(false)}>Consulting</Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>All Services</Link>
          </div>
        )}
      </li>
      <li className="navbar-item">
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </li>
      <li className="navbar-item">
        <Link to="/part" onClick={() => setIsMobileMenuOpen(false)}>Part</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="logo" />
        {windowWidth > 768 && <NavContent />}
        {windowWidth <= 768 && (
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>
      {windowWidth <= 768 && isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavContent />
        </div>
      )}
    </nav>
  );
}

export default Nav;