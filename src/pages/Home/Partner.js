import React, { useEffect } from "react";

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

  const PartnerLogo = [
    {
      image: bloom_bar_logo,
      title: "Bloom Bar",
    },
    {
      image: branca_logo,
      title: "Branca",
    }, 
    {
      image: cfm_logo,
      title: "Community Farmers Markers",
    },
    {
      image: food_well_alliance_logo,
      title: "Food Well Alliance",
    },
    {
      image: grey_goose_vodka_logo,
      title: "Grey Goose Vodka",
    },
    {
      image: heaven_hill_logo,
      title: "Heaven Hill",
    },
    {
      image: slow_food_atlanta_logo,
      title: "Slow Food Atlanta",
    },
    {
      image: spiritless_logo,
      title: "Spiritless",
    },
  ];

  return (
    <div className="partner-logos-wrapper" data-aos="zoom-in">
        <div className="partner-text">
            <h1 className="primary-heading">Partners</h1>
        </div>

        <div className="partner-logo">
          {PartnerLogo.map((data) => (
              <div className="logo-section-info" key={data.title}>
                  <div className="logo-boxes-img-container">
                      <img src={data.image} alt="" />
                  </div>
                  <h2>{data.title}</h2>
              </div>
            ))
          }
        </div>
    </div>
  );
};

export default Partner;
