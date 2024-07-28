import React from 'react'
import WhatsappFloat from '../component/flt_wtp.js';
import LogoBack from '../component/LogoBack.js';
import Footer from '../component/footer.js';
import Nav from '../component/Nav.js';
import ServicesSection from '../component/service_content.js';
function services() {
  return (

    <>
      <Nav />
        <ServicesSection  />
        {/* <div className="logo-tilt-wrapper">
        </div> */}
      <WhatsappFloat />
      <Footer />

    </>
  )
};
export default services;
