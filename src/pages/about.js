import Nav from "../component/Nav.js";
import Footer from '../component/footer.js';
import "./about.css";
import React, { useState, useEffect } from 'react';


const About = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imageCarouselIndex, setImageCarouselIndex] = useState(0);
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

  const showSlide = (index) => {
    setCarouselIndex(index);
  };

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const slideImages = (direction) => {
    if (direction === 'next') {
      setImageCarouselIndex((prevIndex) => (prevIndex + 1) % imageCarouselItems.length);
    } else {
      setImageCarouselIndex((prevIndex) => (prevIndex - 1 + imageCarouselItems.length) % imageCarouselItems.length);
    }
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlideInterval);
  }, [carouselIndex]);

  useEffect(() => {
    const imageAutoSlideInterval = setInterval(() => slideImages('next'), 3000);
    return () => clearInterval(imageAutoSlideInterval);
  }, [imageCarouselIndex]);

  return (
    <div>
     

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
            <a href="#" className="carousel-control prev" onClick={prevSlide}>&#10094;</a>
            <a href="#" className="carousel-control next" onClick={nextSlide}>&#10095;</a>
          </div>
        </section>


        <section className="services">
          <div className="container">
            <div className="service-column">
              <h2>Wedding Services</h2>
              <ul>
                <li>Pre-wedding shoots</li>
                <li>Wedding day coverage</li>
                <li>Post-wedding sessions</li>
                <li>Haldi ceremony</li>
                <li>Mehndi celebration</li>
              </ul>
            </div>
            <div className="service-column">
              <h2>Commercial Services</h2>
              <ul>
                <li>Product photography</li>
                <li>Corporate events</li>
                <li>Advertising campaigns</li>
                <li>Travel and tourism shoots</li>
                <li>Video editing and post-production</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="image-carousel">
          <div className="container">
            <div className="image-carousel-inner" style={{ transform: `translateX(-${imageCarouselIndex * 25}%)` }}>
              {imageCarouselItems.map((src, index) => (
                <div key={index} className="image-carousel-item">
                  <img src={src} alt={`C4capture Portfolio ${index + 1}`} />
                </div>
              ))}
            </div>
            <a href="#" className="image-carousel-control prev" onClick={(e) => { e.preventDefault(); slideImages('prev'); }}>&#10094;</a>
            <a href="#" className="image-carousel-control next" onClick={(e) => { e.preventDefault(); slideImages('next'); }}>&#10095;</a>
          </div>
        </section>

        <PopupSection id="b2b" title="B2B Services" description="We provide tailored services for businesses including photography for products, events, and advertising campaigns." />
        <PopupSection id="b2c" title="B2C Services" description="Our B2C offerings include personalized photography services for weddings, parties, and special events." />
      </main>
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
    <>
    <Nav/>
    <section className={`popup-section ${isActive ? 'active' : ''}`} id={id}>
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
    <Footer />
   </>
  );
};

export default About;
