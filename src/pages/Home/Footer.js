import React, { useState } from "react";
// import { Link } from "react-scroll";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo/asop_logo.jpeg";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from 'react-icons/io';

const sendEmail = () => {
    window.location.href = 'mailto:${asipofparadisegarden@gmail.com}';
}

const Footer = () => {
    const [click, setClick] = useState(false)

    const closeMenu = () => setClick(false)

    return (
        <div className="footer-wrapper" id="footer">
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

                    <ul className={click ? "footer active" : "footer"}>
                        <li className="footer-item">
                            <a href='#intro' onClick={closeMenu}>A Sip of Paradise Garden</a>
                        </li>
                        <li className="footer-item">
                            <a href='#aboutUs' onClick={closeMenu}>About Us</a>
                        </li>
                        <li className="footer-item">
                            <a href='#gallery' onClick={closeMenu}>Gallery</a>
                        </li>
                        <nav className="footer-item">
                            <Link to='/events'>Events</Link>
                        </nav>
                        <nav className="footer-item">
                            <Link to='/contact'>Contact Us</Link>
                        </nav>
                        <nav className="footer-item">
                            <Link to='/payment'>Donate</Link>
                        </nav>
                    </ul>
                </div>

                <div className="footer-section-columns">
                    <span>572 Stokeswood Ave SE, Atlanta, Georgia 30316, United States</span>
                    <li className="footer-item">
                        <a onClick={sendEmail}>asipofparadisegarden@gmail.com</a>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Footer;
