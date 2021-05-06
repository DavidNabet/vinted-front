import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Cookies from "js-cookie";

const Login = ({ getUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "https://vinted-back-project.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(request.data);
      const tokenData = request.data.token;
      // Cookies.set("userToken", tokenData, { expires: 7 });
      getUserToken(tokenData);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="form login_form" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <input
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="S'inscrire" />
      <Link to="/signup">Pas encore de compte ? Inscris-toi</Link>
    </form>
  );
};

export default Login;
