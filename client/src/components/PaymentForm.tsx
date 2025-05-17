import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import { editPremium } from "../services/request";
import "../styles/paymentForm.css";
import { useAuth } from "../services/AuthContext";

export default function PaymentForm() {
  const navigate = useNavigate();
  const { setSubscription } = useAuth();
  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumbers: "",
    expiryDay: "",
    cvv: "",
    country: "",
  } as CardData);

  const countries = [
    "France 🇫🇷",
    "Belgique 🇧🇪",
    "Suisse 🇨🇭",
    "Canada 🇨🇦",
    "USA 🇺🇸",
    "Royaume-Unis 🇬🇧",
    "Allemagne 🇩🇪",
    "Espagne 🇪🇸",
    "Italie 🇮🇹",
  ];

  const cancelPayment = () => {
    navigate("/catalogue");
  };

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/ /g, "");
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    setCardData((prev) => ({
      ...prev,
      cardNumbers: formattedValue.slice(0, 19),
    }));
  };

  const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace("/", "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setCardData((prev) => ({
      ...prev,
      expiryDay: value.slice(0, 5),
    }));
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setCardData((prev) => ({ ...prev, country: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editPremium(navigate, setSubscription);
  };

  return (
    <section className="payment-form">
      <h2>Offre Premium</h2>
      <p>Profiter de l'ensemble des films en souscrivant à l'offre premium.</p>
      <form onSubmit={handleSubmit}>
        <h3>Paiement</h3>
        <h3>Tous les champs sont obligatoires</h3>
        <div className="payment-name">
          <label htmlFor="cardName">Nom indiqué sur la carte</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={cardData.cardName}
            onChange={handleChangeForm}
            placeholder="Votre prénom et nom de famille"
          />
        </div>
        <div className="payment-name">
          <label htmlFor="cardNumbers">Numéros de CB</label>
          <input
            type="text"
            id="cardNumbers"
            name="cardNumbers"
            maxLength={19}
            value={cardData.cardNumbers}
            onChange={handleChangeCardNumber}
            placeholder="XXXX XXXX XXXX XXXX"
          />
        </div>
        <div className="expiry-cvv">
          <div className="payment-left">
            <label htmlFor="expireDay">Date d'expiration</label>
            <input
              type="text"
              id="expireDay"
              name="expireDay"
              maxLength={5}
              value={cardData.expiryDay}
              onChange={handleChangeExpiryDate}
              placeholder="MM/YY"
            />
          </div>
          <div className="payment-right">
            <label htmlFor="cvv">Code de sécurité</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              maxLength={3}
              value={cardData.cvv}
              onChange={handleChangeForm}
              placeholder="XXX"
            />
          </div>
        </div>
        <div className="form-country">
          <label htmlFor="country">Pays</label>
          <input
            list="country-list"
            id="country"
            name="country"
            value={cardData.country}
            onChange={handleChangeForm}
            onFocus={handleFocus}
            placeholder="Sélectionnez votre pays"
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>
        <div className="button-cancel-submit">
          <button type="button" onClick={cancelPayment}>
            Annuler
          </button>
          <button type="submit">Payer</button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
      </form>
    </section>
  );
}
