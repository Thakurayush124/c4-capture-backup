import React, { useState, useEffect } from 'react';
import './Nav-foot.css';

import logo from './logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Nav() {  
  const [isServicesHovering, setIsServicesHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const dropdownStyles = {
    dropdown: {
      display: isServicesHovering ? 'block' : 'none',
      position: 'absolute',
      minWidth: '160px',
      zIndex: 1,
    },
  
    dropdownItem: {
      color: 'black',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
    },
  };

  const toggleScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('nav_blur');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);

      // Add or remove 'nav_blur' class based on visibility
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (isVisible) {
          navbar.classList.add('nav_blur');
        } else {
          navbar.classList.remove('nav_blur');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    
    if (!isMobileMenuOpen) {
      navbar.classList.add('white');
      navbar.classList.remove('nav_blur');
    } else {
      navbar.classList.remove('white');
      navbar.classList.add('nav_blur');
    }

    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleScroll(!isMobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
    toggleScroll(false);
    const navbar = document.querySelector('.navbar');
    navbar.classList.remove('white');
    navbar.classList.add('nav_blur');
  };

  const NavContent = ({ isMobile }) => (
    <ul className="navbar-list text-with-borders">
      <li className="navbar-item">
        <Link className="letter" to="/" onClick={handleMenuItemClick}>Home</Link>
      </li>
      <li className="navbar-item">
        <Link className="letter" to="/about" onClick={handleMenuItemClick}>About</Link>
      </li>
      {isMobile ? (
        <>
          <li className="navbar-item">
            <Link className="letter" to="/services" onClick={handleMenuItemClick}>Services</Link>
          </li>
          <li className="navbar-item">
            <Link className="letter" to="/drop1" onClick={handleMenuItemClick}> Family Event services</Link>
          </li>
          <li className="navbar-item">
            <Link className="letter" to="/drop2" onClick={handleMenuItemClick}>B2B & B2C Services</Link>
          </li>
          
        </>
      ) : (
        <li className="navbar-item"
          onMouseEnter={() => setIsServicesHovering(true)}
          onMouseLeave={() => setIsServicesHovering(false)}
        >
          <Link className="letter" to="/services">Services</Link>
          <div style={dropdownStyles.dropdown} className="dropdown low">
            <Link  to="/drop1" style={dropdownStyles.dropdownItem}>Family Event services</Link>
            <Link  to="/drop2" style={dropdownStyles.dropdownItem}>B2B & B2C Services</Link>
          </div>
        </li>
      )}
      <li className="navbar-item">
        <Link className="letter" to="/contact" onClick={handleMenuItemClick}>Contact</Link>
      </li>
      <li className="navbar-item">
        <Link className="letter" to="/part" onClick={handleMenuItemClick}>Join Us</Link>
      </li>
    </ul>
  );

  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'} ${isMobileMenuOpen ? 'white' : 'nav_blur'}`}>
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="logo" />
        {windowWidth > 768 && <NavContent isMobile={false} />}
        {windowWidth <= 768 && (
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>
      {windowWidth <= 768 && isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavContent isMobile={true} />
        </div>
      )}
    </nav>
  );
}

export default Nav;