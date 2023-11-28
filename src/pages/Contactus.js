import React from "react";

import email from "../assets/contact/email.png";
import facebook from "../assets/contact/fb.png";
import instagram from "../assets/contact/ig.png";
//
const Contact = () => {
  const emailLink =
  "mailto:asipofparadisegarden@gmail.com";
  const facebookLink =
  "https://www.facebook.com/asipofparadisegarden/";
  const instagramLink =
  "https://www.instagram.com/Asipofparadisegarden";


const Contact = () => {
    return (

      <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-5xl font-bold">Contact Us</h1>
        Send us an email, follow us on social media, or get directions!
      
      <div className="grid grid-cols-3 grid-rows-1 gap-4 border-2 border-emerald-400 rounded-xl p-4">
        <div className="w-full h-full">
          <a
            href={emailLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactCard
              src={email}
              alt="Email"
              description="asipofparadisegarden@gmail.com"
              button={true}
            />
          </a>
        </div>
        <div className="w-full h-full">
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactCard
              src={facebook}
              alt="Facebook"
              description="Facebook"
              button={true}
            />
          </a>
        </div>
        <div className="w-full h-full">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactCard
              src={instagram}
              alt="Instagram"
              description="Instagram"
              button={true}
            />
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 grid-rows-1 gap-4 border-2 border-emerald-400 rounded-xl p-4">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3317.858194057881!2d-84.34714527283595!3d33.73848283423007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d33.7384805!2d-84.3444067!4m5!1s0x88f5015cbf3101fd%3A0xf5cd8a395657ddb0!2s572%20Stokeswood%20Ave%20SE%2C%20Atlanta%2C%20GA%2030316!3m2!1d33.7384449!2d-84.3444067!5e0!3m2!1sen!2sus!4v1697506734263!5m2!1sen!2sus" 
          width="600" 
          height="450" 
          style={{border:"0"}} 
          allowfullscreen="" 
          loading="lazy" 
        r eferrerpolicy="no-referrer-when-downgrade"
      ></iframe></p>
      </div>
    )
  }
  
  export default Contact;
