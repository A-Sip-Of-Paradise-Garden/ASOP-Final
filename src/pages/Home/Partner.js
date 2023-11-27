import React, { useEffect } from "react";
import "../../pages/Home/Partner.css"

import bloom_bar_logo from "../../assets/logo/bloom_bar_logo.webp";
import branca_logo from "../../assets/logo/branca_logo.png";
import cfm_logo from "../../assets/logo/cfm_logo.jpeg";
import food_well_alliance_logo from "../../assets/logo/food_well_alliance_logo.png";
import grey_goose_vodka_logo from "../../assets/logo/grey_goose_vodka_logo.png";
import heaven_hill_logo from "../../assets/logo/heaven_hill_logo.jpeg";
import slow_food_atlanta_logo from "../../assets/logo/slow_food_atlanta_logo.jpeg";
import spiritless_logo from "../../assets/logo/spiritless_logo.png"

import AOS from 'aos';
import 'aos/dist/aos.css';

const Partner = () => {
  useEffect(()=> {
    AOS.init({duration: 2000});
  });

  return (
    <div className="partner-logos" data-aos="zoom-in">
        <div className="partner-text">
            <h1 className="primary-heading">Partners</h1>
        </div>
        <div className="logos-slide">
            <img src={bloom_bar_logo} alt="" />
            <img src={branca_logo} alt="" />
            <img src={cfm_logo} alt="" />
            <img src={food_well_alliance_logo} alt="" />
            <img src={grey_goose_vodka_logo} alt="" />
            <img src={heaven_hill_logo} alt="" />
            <img src={slow_food_atlanta_logo} alt="" />
            <img src={spiritless_logo} alt="" />
        </div>
        <div className="logos-slide">
            <img src={bloom_bar_logo} alt="" />
            <img src={branca_logo} alt="" />
            <img src={cfm_logo} alt="" />
            <img src={food_well_alliance_logo} alt="" />
            <img src={grey_goose_vodka_logo} alt="" />
            <img src={heaven_hill_logo} alt="" />
            <img src={slow_food_atlanta_logo} alt="" />
            <img src={spiritless_logo} alt="" />
        </div>
    </div>
  );
};

export default Partner;
