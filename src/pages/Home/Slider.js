import React, { useEffect } from "react";

import ImageSlider from "./ImageSlider";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Slider = () => {
    useEffect(()=> {
        AOS.init({duration: 2000});
    });

  const slides = [
    { url: require('../../assets/slider/1.jpeg'), title: "img1" },
    { url: require('../../assets/slider/2.jpeg'), title: "img2" },
    { url: require('../../assets/slider/3.jpeg'), title: "img3" },
    { url: require('../../assets/slider/4.jpeg'), title: "img4" },
    { url: require('../../assets/slider/5.jpeg'), title: "img5" },
    { url: require('../../assets/slider/6.jpeg'), title: "img6" },
    { url: require('../../assets/slider/7.jpeg'), title: "img7" },
    { url: require('../../assets/slider/8.png'), title: "img8" },
    { url: require('../../assets/slider/9.jpeg'), title: "img9" },
    { url: require('../../assets/slider/10.jpeg'), title: "img10" },
    { url: require('../../assets/slider/11.jpeg'), title: "img11" },
    { url: require('../../assets/slider/12.jpeg'), title: "img12" },
    { url: require('../../assets/slider/13.png'), title: "img13" },
    { url: require('../../assets/slider/14.png'), title: "img14" },
    { url: require('../../assets/slider/15.png'), title: "img15" },
    { url: require('../../assets/slider/16.png'), title: "img16" },
    { url: require('../../assets/slider/17.png'), title: "img17" },
    { url: require('../../assets/slider/18.png'), title: "img18" },
    { url: require('../../assets/slider/19.png'), title: "img19" },
    { url: require('../../assets/slider/20.png'), title: "img20" },
  ];

  const containerStyles = {
    width: "1280px",
    height: "720px",
    margin: "3rem",
    maxWidth: "100%",
  };

  return (
    <div className="slider-page" id="gallery" data-aos="zoom-in">
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Slider;