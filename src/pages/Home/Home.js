import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiArrowRight } from "react-icons/fi";
import asop_img1 from "../../assets/home/asop_img1.png";
import home_banner_bgd from "../../assets/home/home_banner_bgd.png";

import Intro from "../Home/Intro";
import About from "../Home/About";
import Slider from "./Slider";
import Partner from "./Partner";
import Contact from "./Contact";
import Footer from "./Footer";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(()=> {
      AOS.init({duration: 2000});
  });

  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate('/signup');
  }
  
  return (
    <div>
      <div className="home-banner-container">
        <div className="home-bannerImage-container" style={{ marginTop: "24px"}}>
          <img src={home_banner_bgd} alt="" />
        </div>

        <div className="home-text-section">
          <h1 className="primary-heading">
            A Sip of Paradise Garden
          </h1>
          <p className="primary-text">
            Bartenders' Community Garden
          </p>
          <button className="secondary-button" onClick={navigateToSignUp}>
            Become a Member <FiArrowRight />{" "}
          </button>
        </div>
        
        <div className="home-image-section" data-aos="zoom-in">
          <img src={asop_img1} alt="" />
        </div>
      </div>
      <Intro />
      <About />
      <Slider />
      <Partner />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
