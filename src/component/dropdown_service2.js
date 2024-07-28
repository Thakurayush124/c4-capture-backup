import React from 'react';
import img from '../img/weddingphotoslowresolution/2.jpg'
import Nav from '../component/Nav.js';
import Footer from '../component/footer.js';
const ServiceCard = ({ imageSrc, title, description }) => {
  return (
    <div className="col-lg-6 col-md-6 img-box">
      <div className="services-item">
        <div className="service-icon">
          <img src={require(`../img/${imageSrc}`)} alt={title} />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};
const ServicesSection = () => {
    // create your own image dir and use it in imageSrc
    const services = [
        
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Party Shoots",
          description: "Include a specific gallery with high-resolution pictures from the many events the company has photographed. This should demonstrate their capacity to record spontaneous moments, group photos, and the atmosphere of the events as a whole."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Event Shoot",
          description: "Events, conferences, seminars, product launches, and other corporate gatherings are all common settings for event photography photoshoots. The photographer also has responsibility for editing and refining the photos before presenting the finished visual materials to the business."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Visual Content Production",
          description: "The photographer works with the business to comprehend its unique visual content needs and goals. They talk about the objective of the photo session, the intended audience, and the message that should be made clear through the images."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Aerial Photo and Videography",
          description: "Events, conferences, seminars, product launches, and other corporate gatherings are all common settings for event photography photoshoots. The photographer also has responsibility for editing and refining the photos before presenting the finished visual materials to the business."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Travel Shoot",
          description: "Photographing different locations, landscapes, cultures, and experiences while on expeditions and excursions is known as travel photography. The importance of editing in improving and showing the beauty and originality of these vacation images cannot be overstated."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Food photo and videography",
          description: "The culinary sector depends on food photography and videography to attract viewers and potential clients by exhibiting mouthwatering dishes and culinary inventions."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "VR 360 Production",
          description: "VR 360 photography and video, such as color correction, exposure changes, and spatial audio blending for videos. The creation of immersive and interactive virtual reality (VR) experiences that enable viewers to explore a 360-degree view of a scene or location."
        }
      ];
      return (
        <>
        <Nav />
        
        <section className="services-section services-normal spad">
          <div className="container" style={{paddingTop: '90px'}}>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2 style={{textAlign: "center"}}>B2B and B2 service</h2>
                </div>
              </div>
              {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
            </div>
          </div>
        </section>
        <Footer />
        </>
      );
    };
    export default ServicesSection;