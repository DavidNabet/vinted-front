import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Cookies from "js-cookie";

const Login = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-back-project.herokuapp.com/user/login",
        // "http://localhost:3200/user/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      if (response.data.token) {
        setUserToken(response.data.token);
        history.push("/publish");
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.status === 401) {
        setErrors("Mauvais email et/ou mot de passe");
      }
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
      {<p className="invalid-feedback">{errors}</p>}
      <input type="submit" value="Se connecter" />
      <Link to="/signup">Pas encore de compte ? Inscris-toi</Link>
    </form>
  );
};

export default Login;
