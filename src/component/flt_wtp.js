import React from 'react';
import './WhatsappFloat.css'; // Assuming you have CSS for styling
import whatsappImg from './whatsappimg.webp'; // Adjust the path according to your project structure

const WhatsappFloat = () => {
  return (
    <div className="whatsapp-float">
      <a href="https://wa.me/+919599499028" target="_blank" rel="noopener noreferrer">
        <img src={whatsappImg} alt="whatsapp-float-btn" />
      </a>
    </div>
  );
};

export default WhatsappFloat;
