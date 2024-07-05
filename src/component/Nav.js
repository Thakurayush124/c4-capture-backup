import React from 'react';
import './Nav-foot.css'; 
import logo from './logo.png';
import { Link } from 'react-router-dom';



function Nav() {
  return (
    <>
    <nav className="navbar">
                <div className="left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="right">
                    <ul className="navbar-list">
                        <li className="navbar-item"><Link to="/">Home</Link></li>
                        <li className="navbar-item"><Link to="/about">About</Link></li>
                        <li className="navbar-item"><Link to="/services">Services</Link></li>
                        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
            
    </>
  )
};
export default Nav;
