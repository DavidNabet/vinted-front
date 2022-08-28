import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OfferItem from "../components/OfferItem";
import axios from "axios";
import { BallSpinner } from "react-spinners-kit";

const Offer = ({ tokenUser }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);

  useEffect(() => {
    const fetchDataSingle = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URI}/offer/${id}`
          // `http://localhost:3200/offer/${id}`
        );
        // console.log(response.data);
        setOffer(response.data);
        setIsLoadingOffer(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchDataSingle();
  }, [id]);

  return isLoadingOffer ? (
    <BallSpinner size={30} color="#2cb1ba" loading={false} />
  ) : (
    <div className="offer_wrapper">
      <OfferItem offer={offer} tokenUser={tokenUser} />
    </div>
  );
};

export default Offer;
