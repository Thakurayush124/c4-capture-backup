import React from 'react'
import WhatsappFloat from '../component/flt_wtp.js';
import LogoBack from '../component/LogoBack.js';
import Footer from '../component/footer.js';
import Nav from '../component/Nav.js';
import LogoTilt from '../component/LogoTilt.js';
function services() {
  return (

    <>
      <Nav />
      <div className="main-container">
        <div className="logo-tilt-wrapper">
        </div>
      </div>
      <WhatsappFloat />
      <Footer />

    </>
  )
};
export default services;
