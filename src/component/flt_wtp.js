import React from 'react';
import './WhatsappFloat.css'; // Assuming you have CSS for styling
import whatsappImg from './whatsappimg.webp'; // Adjust the path according to your project structure

const WhatsappFloat = () => {
  const message = 'Hello, I am interested in your services. Can you tell me more about them and how you work?';
  const number = '+919599499028';
  const url= `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  
  return (
    <div className="whatsapp-float">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={whatsappImg} alt="whatsapp-float-btn" />
      </a>
    </div>
  );
};

export default WhatsappFloat;
