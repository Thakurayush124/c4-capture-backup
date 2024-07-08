import React from 'react'
import Nav from "../component/Nav.js";
import WhatsappFloat from '../component/flt_wtp.js';
import LogoTilt from '../component/LogoTilt.js';

import Footer from '../component/footer.js';

function services() {
  return (
    <>
      <Nav />
      {/* This aint escort sevices bitches */}
      <h1>This is services section</h1>
      <LogoTilt url="../component/logo.glb" />
      <WhatsappFloat />
      <Footer />
    </>
  )
};
export default services;
