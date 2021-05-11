import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";
const CheckoutForm = ({ owner, descriptionOffer, priceOffer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const history = useHistory();

  const handlePayClick = async (e) => {
    try {
      e.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: owner,
      });
      // console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://vinted-back-project.herokuapp.com/payment",
        // "http://localhost:3200/payment",
        {
          stripeToken: stripeToken,
          title: descriptionOffer,
          priceOffer: priceOffer,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.status === 200) {
        setCompleted(true);
        setTimeout(() => {
          history.push("/");
        }, 4000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handlePayClick}>
          <CardElement />
          <input type="submit" value="Pay" className="btn btn_payment" />
        </form>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.6rem",
          }}
        >
          Paiement effectué !
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
