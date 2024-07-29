import React from 'react'
import WhatsappFloat from '../component/flt_wtp.js';
import LogoBack from '../component/LogoBack.js';

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

    </>
  )
};
export default services;
