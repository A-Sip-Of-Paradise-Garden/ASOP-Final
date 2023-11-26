import React from "react";
import { FiMail } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";

const sendEmail = () => {
  window.location.href = 'mailto:${asipofparadisegarden@gmail.com}';
}

const redirectToFacebook = () => {
  window.location.href = 'https://www.facebook.com/asipofparadisegarden/';
}

const redirectToIG = () => {
  window.location.href = 'https://www.instagram.com/Asipofparadisegarden';
}

const Contact = () => {
    return (
      <div>
        <p align="center">
        <h1 className ="primary-heading">Contact Us</h1>

        <button className="secondary-button" onClick={sendEmail}> 
        Send us an Email!<FiMail /> {" "} 
        </button>
        <br />

        <h1 className ="primary-heading">Socials</h1>

        <button className="secondary-button" onClick={redirectToFacebook}>
          Visit Our Facebook Page!<FiFacebook /> {" "} 
          </button>
        <br />
        <button className="secondary-button" onClick={redirectToIG}>
          Visit Our Instagram Page!<FiInstagram /> {" "} 
          </button>
        <br />
        

        <h1 className ="primary-heading">Get Directions</h1>
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
