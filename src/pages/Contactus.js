import React from "react";

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
        <h1>Contact Us</h1>

      <button onClick={sendEmail}>Send us an Email</button>
      <br />
      <h1>Socials</h1>
      <button onClick={redirectToFacebook}>Visit Our Facebook Page</button>
      <button onClick={redirectToIG}>Visit Our Instagram Page</button>
        </div>
    )
  }
  
  export default Contact;
