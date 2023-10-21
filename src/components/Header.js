// import { useState } from "react";
import logo from "../assets/vinted_logo.png";
import { Link, useLocation } from "react-router-dom";
// import PriceRange from "./RangeSlider";

const Header = ({
  tokenUser,
  setUserToken,
  handleSearch,
  setSort,
  sort,
  setRangeSlider,
  rangeSlider,
}) => {
  const location = useLocation();
  return (
    <header>
      <div className="container header">
        <a href="/">
          <img src={logo} alt="vinted logo" />
        </a>
        <div className="search_container">
          <form>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Recherche des articles"
            />
            {location.pathname === "/" ? (
              <div className="section-filters">
                <button
                  id="sort"
                  style={{
                    backgroundColor: sort ? "#C2175B" : "#2cb1ba",
                    border: "none",
                    marginTop: "10px",
                  }}
                  onClick={setSort}
                >
                  {sort ? "Desc" : "Asc"}
                </button>
                <div className="section-range">
                  {/* <PriceRange setRangeSlider={setRangeSlider} /> */}
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className="connect_container">
          {tokenUser ? (
            <button className="disconnect" onClick={() => setUserToken(null)}>
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="signup">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login">Se connecter</button>
              </Link>
            </>
          )}
          {tokenUser ? (
            <Link to="/publish">
              <button className="cart">Vends tes articles</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="cart">Vends tes articles</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
