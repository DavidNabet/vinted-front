import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { BallSpinner } from "react-spinners-kit";

const Home = ({ isLoading, data }) => {
  return isLoading ? (
    <BallSpinner size={30} color="#2cb1ba" loading={isLoading} />
  ) : (
    <>
      <Hero />
      <div className="container card_wrapper">
        {data.offers.map((item) => {
          return (
            item.product_image.secure_url && (
              <Link
                to={`/offer/${item._id}`}
                key={item._id}
                className="card_container_parent"
              >
                <div className="card_container">
                  <div className="card_avatar-user">
                    <img src={item.owner.account.avatar} alt="avatar user" />
                    <span>{item.owner.account.username}</span>
                  </div>
                  <div className="card_offer">
                    <img
                      src={item.product_image.secure_url}
                      title={item.product_description}
                      alt={item.product_description}
                    />
                    <div className="card_details">
                      <span>{item.product_price} €</span>
                      {item.product_details.map((detail, i) => {
                        return (
                          <React.Fragment key={i}>
                            {detail.TAILLE && <span>{detail.TAILLE}</span>}
                            {detail.MARQUE && <span>{detail.MARQUE}</span>}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </>
  );
};

export default Home;
