import React from "react";

const sendEmail = () => {
  window.location.href = 'mailto:${asipofparadisegarden@gmail.com}';
}

const redirectToFacebook = () => {
  window.location.href = 'https://www.facebook.com/asipofparadisegarden/';
}

const Contact = () => {
    return (
      <div>
        <h1>Contact Us</h1>

      <button onClick={sendEmail}>Send us an Email</button>
      <button onClick={redirectToFacebook}>Visit Our Facebook Page</button>
        </div>
    )
  }
  
  export default Contact;
