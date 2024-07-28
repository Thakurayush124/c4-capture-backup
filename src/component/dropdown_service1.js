import React from 'react';
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
          title: "Wedding Shoots",
          description: "The skill of capturing natural and staged moments during a couple's wedding ceremony, reception, and related festivities is known as wedding photography. The main objective of a wedding photographer is to capture the events of the day while creating a stunning and moving visual narrative."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Pre-Wedding",
          description: "A pre-wedding shoot gives the couple the chance to document their passion and elation in a more private setting, away from the stress of the wedding day. The images from the pre-wedding session serve as a visual record of the couple's love and the preparations for their big day."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Post Wedding",
          description: "Photographers have the chance to think outside the box and come up with original concepts and ideas when shooting after weddings. To produce visually attractive and distinctive photos, the photographer can experiment with various settings, subjects, and objects."
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
                  <h2 style={{textAlign: "center"}}>Family Event Service</h2>
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