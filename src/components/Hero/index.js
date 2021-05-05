import React from "react";
import brush from "../../assets/brush.svg";
import "./index.css";

const Hero = () => {
  return (
    <div className="home hero">
      <img src={brush} alt="" className="home-hero-brush" />
      <div className="container">
        <div className="home-hero-cta">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
