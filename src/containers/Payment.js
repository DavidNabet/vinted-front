import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const Payment = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  const location = useLocation();
  //   console.log(location);
  const { product_name, product_price, owner, product_description } =
    location.state;
  const PRODUCT_NAME = product_name ? product_name : "";
  const PRICE = product_price ? product_price.toFixed(2) : 0;
  const FRAIS_ACHETEURS = (0.4).toFixed(2);
  const FRAIS_PORT = (0.8).toFixed(2);

  console.log(PRICE, FRAIS_ACHETEURS, FRAIS_PORT);

  const total = () => {
    let tab = [];
    tab.push(Number(PRICE), Number(FRAIS_ACHETEURS), Number(FRAIS_PORT));
    const nums = tab.reduce((a, b) => (a += b));
    return nums;
  };

  const TOTAL_RESULT = total().toFixed(2);
  console.log(TOTAL_RESULT);

  return (
    <div className="payment_wrapper">
      <div className="payment_container">
        <div className="top">
          <h5>Résumé de la commande</h5>
          <p>
            <span>Commande</span>
            <span>{PRICE} €</span>
          </p>
          <p>
            <span>Frais de protection acheteurs</span>
            <span>{FRAIS_ACHETEURS} €</span>
          </p>
          <p>
            <span>Frais de port</span>
            <span>{FRAIS_PORT} €</span>
          </p>
        </div>
        <div className="bottom">
          <p>
            <span>Total</span>
            <span>{TOTAL_RESULT} €</span>
          </p>
          <p className="baseline">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <strong>{PRODUCT_NAME}</strong>. Vous allez payer{" "}
            <strong> {TOTAL_RESULT} €</strong> (frais de protection et frais de
            port inclus)
          </p>
          <div className="payment_purchase_inner">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                owner={owner._id}
                descriptionOffer={product_description}
                priceOffer={TOTAL_RESULT}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
