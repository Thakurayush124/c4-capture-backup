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
    'data:image/jpeg;base64,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', 
    'path_to_image_2.jpg', 
    'path_to_image_3.jpg', 
    'path_to_image_4.jpg',
    'path_to_image_5.jpg',
     'path_to_image_6.jpg',
      'path_to_image_7.jpg',
       'path_to_image_8.jpg'
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
        <section className="about-section">
        <h1>About Our Company</h1>
        <p>We have been serving our customers with top-notch photography and videography services for over a decade. Our commitment to excellence and customer satisfaction has earned us a reputation as a trusted name in the industry.</p>
        <ul>
          <li>Over 500 satisfied customers</li>
          <li>Completed more than 1000 projects</li>
          <li>Operating in 10+ cities</li>
          <li>Award-winning team of professionals</li>
          <li>State-of-the-art equipment and technology</li>
        </ul>

        <div className="carousel">
          <h2>{carouselItems[carouselIndex].title}</h2>
          <p>{carouselItems[carouselIndex].description}</p>
          <button onClick={nextSlide}>Next</button>
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
          </div>
        </section>

        <PopupSection id="b2b" title="B2B Services" description="We provide tailored services for businesses including photography for products, events, and advertising campaigns." />
        <PopupSection id="b2c" title="B2C Services" description="Our B2C offerings include personalized photography services for weddings, parties, and special events." />
        <Footer/>
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
    
   </>
  );
};

export default About;
