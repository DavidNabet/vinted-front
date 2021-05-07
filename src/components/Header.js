// import { useState } from "react";
import logo from "../assets/vinted_logo.png";
import { Link } from "react-router-dom";

const Header = ({ tokenUser, getUserToken, handleChange }) => {
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
              onChange={handleChange}
              placeholder="Recherche des articles"
            />
          </form>
        </div>
        <div className="connect_container">
          {tokenUser ? (
            <button className="disconnect" onClick={() => getUserToken(null)}>
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
          <button className="cart">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
