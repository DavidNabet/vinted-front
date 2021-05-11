import React from "react";
import brush from "../../assets/brush.svg";
import "./index.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Hero = () => {
  const userToken = Cookies.get("userToken");
  return (
    <div className="home hero">
      <img src={brush} alt="" className="home-hero-brush" />
      <div className="container">
        <div className="home-hero-cta">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          {userToken ? (
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Commencer à vendre</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
