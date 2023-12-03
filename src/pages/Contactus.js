import React from "react";
import emailLogo from "../assets/contact/gmail.png";
import facebookLogo from "../assets/contact/facebook.png";
import instagramLogo from "../assets/contact/instagram.png";

const links = {
  email: "mailto:asipofparadisegarden@gmail.com",
  facebook: "https://www.facebook.com/asipofparadisegarden/",
  instagram: "https://www.instagram.com/Asipofparadisegarden",
};

const Contact = () => {
  const { email, facebook, instagram } = links;

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-5xl font-bold">Contact Us</h1>
      Send us an email, follow us on social media, or get directions!
      <div className="flex flex-wrap gap-2 w-full justify-center">
        <SocialMediaLink
          url={facebook}
          imageSrc={facebookLogo}
          altText="Facebook"
          text="Facebook"
        />
        <SocialMediaLink
          url={instagram}
          imageSrc={instagramLogo}
          altText="Instagram"
          text="Instagram"
        />
        <EmailLink
          url={email}
          imageSrc={emailLogo}
          altText="Email"
          text="Email"
        />
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3317.858194057881!2d-84.34714527283595!3d33.73848283423007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d33.7384805!2d-84.3444067!4m5!1s0x88f5015cbf3101fd%3A0xf5cd8a395657ddb0!2s572%20Stokeswood%20Ave%20SE%2C%20Atlanta%2C%20GA%2030316!3m2!1d33.7384449!2d-84.3444067!5e0!3m2!1sen!2sus!4v1697506734263!5m2!1sen!2sus"
        className="max-w-4xl h-[40rem] w-full rounded-xl"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const SocialMediaLink = ({ url, imageSrc, altText, text, isEmail = false }) => {
  return (
    <a
      href={"mailto:asipofparadisegarden@gmail.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 border border-black rounded-xl max-w-[10rem] w-full justify-center hover:bg-slate-100"
    >
      <span>{text}</span>
      <img src={imageSrc} alt={altText} />
    </a>
  );
};

const EmailLink = ({ url, imageSrc, altText, text }) => {
  return (
    <a
      href={url}
      className="flex items-center gap-2 border border-black rounded-xl max-w-[10rem] w-full justify-center hover:bg-slate-100"
    >
      <span>{text}</span>
      <img src={imageSrc} alt={altText} />
    </a>
  );
};

export default Contact;
