import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import OfferItem from "../components/OfferItem";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);

  useEffect(() => {
    const fetchDataSingle = async () => {
      try {
        const response = await axios.get(
          `https://vinted-back-project.herokuapp.com/offer/${id}`
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
    <Loader />
  ) : (
    <div className="offer_wrapper">
      <OfferItem offer={offer} />
    </div>
  );
};

export default Offer;
