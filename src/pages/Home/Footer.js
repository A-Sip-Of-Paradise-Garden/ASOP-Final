import React from "react";
import Logo from "../../assets/logo/asop_logo.jpeg";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from 'react-icons/io';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-icons">
          <FaFacebookF />
          <IoLogoInstagram />
        </div>
        <div className="footer-section-columns">
          <span>About Us</span>
          <span>Contact Us</span>
          <span>Events</span>
          <span>Donate</span>
        </div>
        <div className="footer-section-columns">
          <span>572 Stokeswood Ave SE, Atlanta, Georgia 30316, United States</span>
          <span>asipofparadisegarden@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
