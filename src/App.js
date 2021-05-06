import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const [tokenUser, setTokenUser] = useState(Cookies.get("userToken") || null);

  const getUserToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setTokenUser(token);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  return (
    <>
      <Router>
        <Header tokenUser={tokenUser} getUserToken={getUserToken} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/login">
            <Login getUserToken={getUserToken} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
