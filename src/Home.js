import React from "react";
import './Home.css'; // Ensure the correct path to the CSS file
import logo from './logo.png'; // Ensure the correct path to the logo image
import video from './banni.mp4';
import './service1.jpg'


const services = [
    "WEDDING SHOOTS",
    "PRE-WEDDING",
    "POST WEDDING",
    "MATERNITY SHOOT",
    "PARTY SHOOTS",
    "EVENT SHOOT",
    "VISUAL CONTENT PRODUCTION",
    "AERIAL PHOTO AND VIDEOGRAPHY",
    "CLIENT TESTIMONIAL VIDEO PRODUCTION",
    "REAL-ESTATE PHOTO & VIDEOGRAPHY",
    "TRAVEL SHOOT",
    "FOOD PHOTO AND VIDEOGRAPHY",
    "VR 360 PRODUCTION",
    "BIRTHDAY SHOOT"
];

const serviceImages = [
    './service1.jpg',
    './service2.jpg',
    './service3.jpg',
    './service4.jpg',
    './service5.jpg',
    './service6.jpg',
    './service7.jpg',
    './service8.jpg',
    './service9.jpg',
    './service10.jpg',
    './service11.jpg',
    './service12.jpg',
    './service13.jpg',
    './service14.jpg'
];


function Home() {
    const handleWhatsAppClick = () => {
        const phoneNumber = '+917042405605'; // Replace with your WhatsApp number
        const message = 'Hello, I would like to inquire about your services.'; // Replace with your custom message
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
    return (
        <>
             <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

            <nav className="navbar">
                <div className="left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="right">
                    <ul className="navbar-list">
                        <li className="navbar-item"><a href="/">Home</a></li>
                        <li className="navbar-item"><a href="/about">About</a></li>
                        <li className="navbar-item"><a href="/services">Services</a></li>
                        <li className="navbar-item"><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
            <div className="vd">
                <video autoPlay loop muted src={video} className="video-element"></video>
            </div>
            <div className="content">
                <p>We are the pioneers of modern wedding photography and filmmaking in India and our award-winning team documents stories of love from all around the world since 2014. Founded by Anupam Maurya & Soumi Goswami, KnotsbyAMP is a collective of fine art photographers and filmmakers that has covered a rich kaleidoscope of Indian Weddings and is winner of multiple Wedding Photographer of the Year titles and international recognition.</p>
                <button className="button">Get in touch</button>
            </div>
            <div className="services">
                <h2>Our Services</h2>
                <div className="grid-container-1">
                    {services.map((service, index) => (
                        <div key={index} className="grid-item-1">
                            <img src={serviceImages[index]} alt={service} className="service-image" />
                            <p>{service}</p>
                        </div>
                    ))}
                </div>
            </div>
           

            
            <div className="get-in-touch">
                < p >Get in touch</p>
                <button onClick={handleWhatsAppClick}>
    <p>Say "Hi!" on Whatsapp</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
    </svg>
</button>
            
            </div>
            <footer>
                <div className="foot-logo">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="grid-container">
                    <a href="#link1" className="grid-item">HOME</a>
                    <a href="#link2" className="grid-item"> BLOG</a>
                    <a href="#link3" className="grid-item">FAQ</a>
                    <a href="#link4" className="grid-item">ABOUT</a>
                    <a href="#link5" className="grid-item">SERVICES</a>
                    <a href="#link6" className="grid-item">CONTACT</a>
                </div>
                <div className="foot">
                    <p >Company registered address :- H. No. 24 Rajpur Khurd, Chhattarpur, Delhi 110068</p>
                    <p>Branch office :- Lane No 1 - Dwarika Puram, Mothrowala Dehradun - 248001</p>
                    <p>info@c4capture.com | +91 9599499028 |+91 9599499047  </p>
                </div>
            </footer>
            <p>Copyright © 2024 All rights reserved C4capture Production House Private Limited </p>


        </>
    );
}

export default Home;
