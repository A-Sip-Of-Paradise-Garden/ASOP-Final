import React, { useEffect } from "react";
import asop_Keyatta_img1 from "../../assets/home/asop_Keyatta_img1.png";
import asop_Rori_img1 from "../../assets/home/asop_Rori_img1.png";
import asop_Stephanie_img1 from "../../assets/home/asop_Stephanie_img1.png";
import about_bgd from "../../assets/home/about_bgd.png";

import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    const AboutInfo = [
        {
            image: asop_Keyatta_img1,
            title: "Keyatta Mincey Parker",
            text: "Executive Director",
        },
        {
            image: asop_Rori_img1,
            title: "Rori Robinson",
            text: "Director of Gardening and Development",
        },
        {
            image: asop_Stephanie_img1,
            title: "Stephanie R Saputo",
            text: "Director of Communications",
        },
    ];

    useEffect(()=> {
        AOS.init({duration: 2000});
    });
    
    return (
        <div className="about-section-wrapper" data-aos="zoom-in">
            <div className="about-bgd-image-container">
                <img src={about_bgd} alt="" />
            </div>

            <div className="about-section-top">
                <h1 className="primary-heading">About Us</h1>
            </div>
            
            <div className="about-section-bottom">
                {AboutInfo.map((data) => (
                    <div className="about-section-info" key={data.title}>
                        <div className="info-boxes-img-container">
                            <img src={data.image} alt="" />
                        </div>
                        <h2>{data.title}</h2>
                        <p>{data.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;