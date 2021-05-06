import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";

const Signup = ({ getUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "https://vinted-back-project.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          phone: "0607080910",
        }
      );
      console.log(request.data);
      // const tokenData = response.data.token;
      // Cookies.set("userToken", tokenData, { expires: 7 });
      // getUserToken(tokenData);
      history.push("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="signup_form form" onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nom d'utilisateur"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <div className="checkbox_container">
        <div className="checkbox_inner">
          <input
            type="checkbox"
            id="chekbox_login"
            defaultChecked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
          />
          <label htmlFor="checkbox_login">S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      <input type="submit" value="S'inscrire" />
      <Link to="/login">Tu as déjà un compte ? Connecte-toi ?</Link>
    </form>
  );
};

export default Signup;
