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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavContent = ({ isMobile }) => (
    
    <ul className="navbar-list text-with-borders">
      <li className="navbar-item letter">
        <Link className="letter" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
      </li>
      {isMobile ? (
        <>
          <li className="navbar-item">
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services/web-development" onClick={() => setIsMobileMenuOpen(false)}>- Web Development</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services/mobile-apps" onClick={() => setIsMobileMenuOpen(false)}>- Mobile Apps</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services/cloud-solutions" onClick={() => setIsMobileMenuOpen(false)}>- Cloud Solutions</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services/consulting" onClick={() => setIsMobileMenuOpen(false)}>- Consulting</Link>
          </li>
        </>
      ) : (
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
      )}
      <li className="navbar-item">
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </li>
      <li className="navbar-item">
        <Link to="/part" onClick={() => setIsMobileMenuOpen(false)}>Part</Link>
      </li>
    </ul>
  );

  return (
    <nav className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'}`}>
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