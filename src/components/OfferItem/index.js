import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const OfferItem = ({ offer, tokenUser }) => {
  return (
    <div className="offer_container">
      <img src={offer.product_image.secure_url} alt="" />

      <div className="offer_detail">
        <div>
          <span className="offer_detail_price">{offer.product_price} €</span>
          <ul className="offer_detail_list">
            <li>
              <span>MARQUE</span>
              <span>{offer.product_details[0].MARQUE}</span>
            </li>
            <li>
              <span>TAILLE</span>
              <span>{offer.product_details[1].TAILLE}</span>
            </li>
            <li>
              <span>ETAT</span>
              <span>{offer.product_details[2].ETAT}</span>
            </li>
            <li>
              <span>COULEUR</span>
              <span>{offer.product_details[3].COULEUR}</span>
            </li>
            <li>
              <span>EMPLACEMENT</span>
              <span>{offer.product_details[4].EMPLACEMENT}</span>
            </li>
            <li>
              <span>MODES DE PAIEMENT</span>
              <span>CARTE BANCAIRE, STRIPE</span>
            </li>
          </ul>
        </div>
        <div className="offer_detail_content">
          <p className="detail_name">{offer.product_name}</p>
          <p className="detail_description">{offer.product_description}</p>
          <div className="detail_avatar_name">
            <img src={offer.owner.account.avatar} alt="avatar" />
            <span>{offer.owner.account.username}</span>
          </div>
        </div>
        {tokenUser ? (
          <Link to={{ pathname: "/payment", state: offer }}>
            <button>Acheter</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Acheter</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OfferItem;
