import React from "react";
import venmoImage from "../assets/donate/venmo.png";
import cashApp from "../assets/donate/cash_app.png";
import paypal from "../assets/donate/paypal.png";
import creditCard from "../assets/donate/credit_cards.png";
import birdFeeder from "../assets/donate/bird_feeder.jpeg";
import calendar from "../assets/donate/calendar.png";
import ceramicPlanters from "../assets/donate/ceramic_planters.png";
import leafBlower from "../assets/donate/leaf_blower.png";
import membership from "../assets/donate/membership.png";
import rake from "../assets/donate/rake.png";
import shovel from "../assets/donate/shovel.png";
import volunteers from "../assets/donate/volunteers.jpeg";

const DonationPage = () => {
  const paypalDonationLink =
    "https://www.paypal.com/donate?business=asipofparadisegarden@gmail.com";

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-4xl font-bold">Donate</h1>
      <p className="max-w-xl">
        Your support and contributions will enable us to meet our vision for
        bartenders to grow food, herbs, and flowers for themselves and their
        families to help transform their wellness and happiness.
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 border-emerald-400 rounded-xl p-4">
        <DonationCard
          src={venmoImage}
          alt="Venmo"
          description="@asipofparadisegarden"
        />
        <DonationCard
          src={cashApp}
          alt="Cash App"
          description="$Asipofparadisegarden"
        />
        <div className="w-full h-full">
          <a
            href={paypalDonationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DonationCard
              src={paypal}
              alt="PayPal"
              description="asipofparadisegarden@gmail.com"
              button={true}
            />
          </a>
        </div>
        <form
          className="w-full h-full"
          action="http://localhost:4000/create-donate-checkout-session"
          method="POST"
        >
          <button className="w-full h-full">
            <DonationCard
              src={creditCard}
              alt="Credit Card"
              description="Credit / Debit Card"
              button={true}
            />
          </button>
        </form>
      </div>
      <h2 className="text-2xl">With your help, we can do these things:</h2>
      <div className="flex flex-wrap gap-4 justify-center max-w-3xl">
        <DonationItem src={shovel} alt="Shovel" description="$15 Shovels" />
        <DonationItem src={rake} alt="Rake" description="$30 Rakes" />
        <DonationItem src={birdFeeder} alt="Bird Feeder" description="$50 Bird Feeders" />
        <DonationItem src={membership} alt="Membership" description="$75 Annual Membership" />
        <DonationItem src={leafBlower} alt="Leaf Blower" description="$225 Electric Leaf Blower with Bag" />
        <DonationItem src={ceramicPlanters} alt="Plant" description="$300 Large Ceramic Planters" />
        <DonationItem src={volunteers} alt="Volunteers" description="$500 Volunteer Day" />
        <DonationItem src={calendar} alt="Calendar" description="$4,500 Full Month of Programming" />
      </div>
    </div>
  );
};

const DonationCard = ({ src, alt, description, button = false }) => {
  return (
    <div
      className={`flex flex-col overflow-normal border rounded-xl py-2 px-4 items-center gap-2 h-full justify-center ${
        button ? "hover:bg-slate-100" : ""
      }`}
    >
      <img src={src} alt={alt} className="max-w-[10rem] px-2" />
      <p className={`${button ? "hidden" : ""} sm:block text-sm sm:text-base`}>
        {description}
      </p>
    </div>
  );
};

const DonationItem = ({ src, alt, description }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[9rem]">
      <img src={src} alt={alt} className="px-2 border rounded-xl" />
      <p className="text-sm sm:text-base">{description}</p>
    </div>
  );
}

export default DonationPage;
