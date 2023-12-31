import React, { useEffect } from "react";

import asop_img2 from "../../assets/home/asop_img2.png";
import asop_img3 from "../../assets/home/asop_img3.png"
import intro_bgd from "../../assets/home/intro_bgd.png";

import AOS from 'aos';
import 'aos/dist/aos.css';


const Intro = () => {
    useEffect(()=> {
        AOS.init({duration: 2000});
    });
    
    return (
        <div className="intro-section-container" id="intro">
            <div className="intro-bgd-image-container">
                <img src={intro_bgd} alt="" />
            </div>

            <div className="intro-section-image-container" data-aos="zoom-out">
                <img src={asop_img2} alt="" />
                <img src={asop_img3} alt="" />
            </div>
            
            <div className="intro-section-text-container" data-aos="zoom-out">
                <p className="primary-subheading">Brief Introduction</p>

                <h1 className="primary-heading">Welcome</h1>
                <p className="primary-text">
                    A Sip of Paradise is a nonprofit bartenders' community garden.
                </p>
                <h1 className="primary-heading">Mission</h1>
                <p className="primary-text">
                    A Sip of Paradise Garden provides horticultural therapy, employment resources, and health and wellness programs 
                    for bartenders and the greater hospitality community to recharge their minds, bodies and spirits.
                </p>
                <h1 className="primary-heading">Vision</h1>
                <p className="primary-text">
                    We envision a community of hospitality professionals that will maintain economic independence and access to 
                    sustainable food sources to help transform their wellness and improve their quality of life.
                </p>
                <h1 className="primary-heading">Values</h1>
                <p className="primary-text">
                    - To improve the mental and physical health of members through wellness and wraparound support
                </p>
                <p className="primary-text">
                    - To stabilize and empower members and their families through socio-economic growth and development
                </p>
                <p className="primary-text">
                    - To strengthen the hospitality community through outdoor gardening and beautification for the betterment of the overall Atlanta metropolitan area
                </p>
            </div>
        </div>
    );
};

export default Intro;