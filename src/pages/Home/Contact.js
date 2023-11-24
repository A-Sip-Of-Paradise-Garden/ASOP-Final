import React, { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

const sendEmail = () => {
  window.location.href = 'mailto:${asipofparadisegarden@gmail.com}';
}

const Contact = () => {
  useEffect(()=> {
    AOS.init({duration: 2000});
  });

  return (
    <div className="contact-page-wrapper" id="contact" data-aos="zoom-in">
      <h1 className="primary-heading">Contact Us</h1>
      <h1 className="primary-text">Please feel free to email us.</h1>
      <div className="contact-form-container">
        <button className="secondary-button" onClick={sendEmail}>Email</button>
      </div>
    </div>
  );
};

export default Contact;
