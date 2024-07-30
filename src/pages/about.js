import Nav from "../component/Nav.js";
import Footer from '../component/footer.js';
import "./about.css";
import React, { useState, useEffect, useCallback, useRef } from 'react';

const About = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);
  const imageCarouselRef = useRef(null);

  const carouselItems = [
    { title: 'Expertise', description: 'Our team of professionals has years of experience in photography and videography across various domains.' },
    { title: 'Cutting-edge Equipment', description: 'We use the latest technology and equipment to ensure the highest quality output for all our projects.' },
    { title: 'Customized Solutions', description: 'We tailor our services to meet your specific needs, ensuring a personalized experience.' },
    { title: 'Timely Delivery', description: 'We understand the importance of deadlines and always strive to deliver our work on time.' },
    { title: 'Post-production Excellence', description: 'Our editing team adds the final touch of magic to create stunning visuals that captivate audiences.' }
  ];
  const imageCarouselItems = [
    'path_to_image_1.jpg', 'path_to_image_2.jpg', 'path_to_image_3.jpg', 'path_to_image_4.jpg',
    'path_to_image_5.jpg', 'path_to_image_6.jpg', 'path_to_image_7.jpg', 'path_to_image_8.jpg'
  ];

  const nextSlide = useCallback(() => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, [carouselItems.length]);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  }, [carouselItems.length]);

  const slideImages = useCallback((direction) => {
    setImageCarouselIndex((prevIndex) => {
      const newIndex = direction === 'next'
        ? (prevIndex + 1) % imageCarouselItems.length
        : (prevIndex - 1 + imageCarouselItems.length) % imageCarouselItems.length;
      
      if (imageCarouselRef.current) {
        imageCarouselRef.current.style.transform = `translateX(-${newIndex * 25}%)`;
      }
      
      return newIndex;
    });
  }, [imageCarouselItems.length]);

  useEffect(() => {
    const autoSlideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlideInterval);
  }, [nextSlide]);

  useEffect(() => {
    const imageAutoSlideInterval = setInterval(() => slideImages('next'), 3000);
    return () => clearInterval(imageAutoSlideInterval);
  }, [slideImages]);

  return (
    <div>
      <Nav />

      <main>
        <section className="who-we-are" style={{paddingTop: '90px'}}>
          <div className="container">
            <h2>Who We Are</h2>
            <p>
              C4capture Private Limited is a premier photography and videography editing company based in India. With a passion for capturing life's most precious moments, we specialize in a wide range of services including wedding photography, commercial shoots, product photography, and travel documentation. Our team of skilled professionals brings creativity and technical expertise to every project, ensuring that each image and video tells a compelling story. From the vibrant colors of a traditional Indian wedding to the sleek lines of modern product photography, we pride ourselves on our ability to adapt our style to meet the unique needs of each client. With state-of-the-art equipment and cutting-edge editing techniques, we transform raw footage into polished, emotive visual narratives that exceed expectations. At C4capture, we don't just take pictures or videos; we create timeless memories and powerful visual content that resonates with audiences and elevates brands.
            </p>
          </div>
        </section>

        <section className="carousel" id="why-hire-us">
          <div className="container">
            <h2>Why Hire Us?</h2>
            <div className="carousel-inner" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
              {carouselItems.map((item, index) => (
                <div key={index} className="carousel-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
            <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
          </div>
        </section>

        <section className="services">
          <div className="container">
            <div className="service-column">
              <h2>Wedding Services</h2>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '10px' }}>Pre-wedding shoots</li>
                <li style={{ marginBottom: '10px' }}>Wedding day coverage</li>
                <li style={{ marginBottom: '10px' }}>Post-wedding sessions</li>
                <li style={{ marginBottom: '10px' }}>Haldi ceremony</li>
                <li style={{ marginBottom: '10px' }}>Mehndi celebration</li>
              </ul>
            </div>
            <div className="service-column">
              <h2>Commercial Services</h2>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '10px' }}>Product photography</li>
                <li style={{ marginBottom: '10px' }}>Corporate events</li>
                <li style={{ marginBottom: '10px' }}>Advertising campaigns</li>
                <li style={{ marginBottom: '10px' }}>Travel and tourism shoots</li>
                <li style={{ marginBottom: '10px' }}>Video editing and post-production</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="image-carousel">
          <div className="container">
            <div 
              ref={imageCarouselRef}
              className="image-carousel-inner" 
              style={{ 
                display: 'flex',
                transition: 'transform 0.5s ease',
                transform: `translateX(-${imageCarouselIndex * 25}%)`
              }}
            >
              {imageCarouselItems.map((src, index) => (
                <div key={index} className="image-carousel-item" style={{ flex: '0 0 25%' }}>
                  <img src={src} alt={`C4capture Portfolio ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                </div>
              ))}
            </div>
            <button className="image-carousel-control prev" onClick={() => slideImages('prev')}>&#10094;</button>
            <button className="image-carousel-control next" onClick={() => slideImages('next')}>&#10095;</button>
          </div>
        </section>

        <PopupSection id="b2b" title="B2B Services" description="We provide tailored services for businesses including photography for products, events, and advertising campaigns." />
        <PopupSection id="b2c" title="B2C Services" description="Our B2C offerings include personalized photography services for weddings, parties, and special events." />
      </main>
      <Footer />
    </div>
  );
};

const PopupSection = ({ id, title, description }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(id);
      if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
        setIsActive(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  return (
    <section className={`popup-section ${isActive ? 'active' : ''}`} id={id}>
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default About;