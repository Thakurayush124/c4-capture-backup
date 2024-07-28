import React from 'react';
import img from '../img/weddingphotoslowresolution/2.jpg'

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
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Maternity Shoot",
          description: "Maternity picture shoots honor the expectant mother and her expanding baby bulge by capturing the beauty and joy of pregnancy. These unposed pictures have the potential to be touching and moving."
        },
        {
          imageSrc: "weddingphotoslowresolution/2.jpg",
          title: "Birthday Shoot",
          description: "For birthday picture shoots, candid photography is essential, especially when there are kids or unstructured gatherings. Images that are sincere and heartwarming are produced when real emotions, giggles, and interactions between visitors are captured."
        },
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
        <section className="services-section services-normal spad">
          <div className="container" style={{paddingTop: '90px'}}>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h2 style={{textAlign: "center"}}>Our Services</h2>
                </div>
              </div>
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>
      );
    };
    export default ServicesSection;