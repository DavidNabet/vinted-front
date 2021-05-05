import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);

  useEffect(() => {
    const fetchDataSingle = async () => {
      try {
        //   `https://vinted-back-project.herokuapp.com/offer/${id}`
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <span>Chargement du produit...</span>
  ) : (
    <div>{offer}</div>
    // <div className="offer_wrapper">
    //   <div className="offer_container">
    //     <div className="offer_pictures">
    //       <img src={offer.product_image.url} alt="" />
    //     </div>
    //     <div className="offer_detail">
    //       <div>
    //         <span className="offer_detail_price">{offer.product_price}</span>
    //         <ul className="offer_detail_list">
    //           <li>
    //             <span>MARQUE</span>
    //             <span>{offer.product_details[0].MARQUE}</span>
    //           </li>
    //           <li>
    //             <span>TAILLE</span>
    //             <span>{offer.product_details[1].TAILLE}</span>
    //           </li>
    //           <li>
    //             <span>ETAT</span>
    //             <span>{offer.product_details[2].ETAT}</span>
    //           </li>
    //           <li>
    //             <span>COULEUR</span>
    //             <span>{offer.product_details[3].COULEUR}</span>
    //           </li>
    //           <li>
    //             <span>EMPLACEMENT</span>
    //             <span>{offer.product_details[4].EMPLACEMENT}</span>
    //           </li>
    //           <li>
    //             <span>MODES DE PAIEMENT</span>
    //             <span>CARTE BANCAIRE, PAYPAL</span>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="offer_detail_content">
    //         <p className="detail_name">{offer.product_name}</p>
    //         <p className="detail_description">{offer.product_description}</p>
    //         <div className="detail_avatar_name">
    //           <img src={offer.owner.account.avatar} alt="avatar" />
    //           <span>{offer.owner.account.username}</span>
    //         </div>
    //       </div>
    //       <button>Acheter</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Offer;
