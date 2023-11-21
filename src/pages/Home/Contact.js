import React, { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(()=> {
    AOS.init({duration: 2000});
  });

  return (
    <div className="contact-page-wrapper" data-aos="zoom-in">
      <h1 className="primary-heading">Subscribe</h1>
      <h1 className="primary-text">Sign up to hear from us about special events in the garden.</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
