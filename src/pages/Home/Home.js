import { auth } from "../../config/firebase";
import { FiArrowRight } from "react-icons/fi";
import asop_img1 from "../../assets/home/asop_img1.png";

const Home = () => {
  return (
    <div>
      <h1>Current User: {auth?.currentUser?.uid}</h1>
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            A Sip of Paradise Garden
          </h1>
          <p className="primary-text">
            Bartenders' Community Garden
          </p>
          <button className="secondary-button">
            Become a Member <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={asop_img1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
