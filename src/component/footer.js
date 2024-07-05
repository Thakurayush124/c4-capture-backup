import React from 'react'
import './Nav-foot.css'; 
import logo from './logo.png';
 function footer() {
  return (
    <>
    <div className="shashwat-footer">
        
            <div className="footerx">
                <div className="footer-item foot-logo para-mini-mini-text">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="footer-item grid-container para-mini-mini-text">
                    <a href="#link1" className="grid-item">HOME</a>
                    <a href="#link2" className="grid-item">Instagram</a>
                    <a href="#link3" className="grid-item">FAQ</a>
                    <a href="#link4" className="grid-item">LinkedIn</a>
                    <a href="#link5" className="grid-item">SERVICES</a>
                    <a href="#link6" className="grid-item">CONTACT</a>
                </div>
                <div className="footer-item foot para-mini-mini-text">
                    <p>Company registered address :</p><p>- H. No. 24 Rajpur Khurd, Chhattarpur, Delhi 110068</p>
                    <p>Branch office :- Lane No 1 - Dwarika Puram, Mothrowala Dehradun - 248001</p>
                    <p>info@c4capture.com | +91 9599499028 | +91 9599499047</p>
                </div>
            </div>
            <p>Copyright © 2024 All rights reserved C4capture Production House Private Limited</p>
        </div>
</>
  )
};
export default footer;
