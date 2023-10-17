import React from "react";

const sendEmail = () => {
  window.location.href = 'mailto:${asipofparadisegarden@gmail.com}';
}

const Contact = () => {
    return (
      <div>
        <h1>Contact Us</h1>
        
      <button onClick={sendEmail}>Send us an Email</button>
        </div>
    )
  }
  
  export default Contact;
