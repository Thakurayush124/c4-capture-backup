import React, { useState } from "react";
import emailjs from 'emailjs-com';
import Nav from "../component/Nav.js";
import Footer from "../component/footer.js";
import backimg from "./contact-bg.jpg";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [telephonePlaceholder, setTelephonePlaceholder] = useState('My number is');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleTelephoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setTelephone(value);
    }
    if (value.length !== 10) {
      setTelephonePlaceholder('invalid');
    } else {
      setTelephonePlaceholder('My number is');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      telephone,
      subject,
      message,
    };

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        // Reset form fields
        setName('');
        setEmail('');
        setTelephone('');
        setSubject('');
        setMessage('');
        setShowSuccessMessage(true);

        // // Hide success message and show form after 2 seconds
        // setTimeout(() => {
        //   setShowSuccessMessage(false);
        // }, 2000);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <>
      <Nav />
      <div className="image">
        <img src={backimg} alt="img" />
        <div className="centered-text">LET'S MAKE IT HAPPY</div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          Form submitted successfully!
        </div>
      )}

      {!showSuccessMessage && (
        <div id="container">
          <h1>&bull; Keep in Touch &bull;</h1>
          <div className="underline"></div>
          <div className="icon_wrapper">
            <svg className="icon" viewBox="0 0 145.192 145.192">
              {/* Your SVG code here */}
            </svg>
          </div>

          <form id="contact_form" onSubmit={handleSubmit}>
            <div className="name">
              <input
                type="text"
                placeholder="My name is"
                name="name"
                id="name_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="email">
              <input
                type="email"
                placeholder="My e-mail is"
                name="email"
                id="email_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="telephone">
              <input
                type="text"
                placeholder={telephonePlaceholder}
                name="telephone"
                id="telephone_input"
                value={telephone}
                onChange={handleTelephoneChange}
                required
              />
            </div>
            <div className="subject">
              <select
                name="subject"
                id="subject_input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option disabled hidden>Select a subject</option>
                <option>I'd like to start a project</option>
                <option>I'd like to ask a question</option>
                <option>I'd like to make a proposal</option>
              </select>
            </div>
            <div className="message">
              <textarea
                name="message"
                placeholder="I'd like to chat about"
                id="message_input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols="30"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="submit">
              <input type="submit" value="Send Message" id="form_button" />
            </div>
          </form>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Contact;
