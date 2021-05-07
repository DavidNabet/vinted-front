import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";

function App() {
  const [tokenUser, setTokenUser] = useState(Cookies.get("userToken") || null);
  const [resultsSearch, setResultsSearch] = useState();
  // const [isFetching, setIsFetching] = useState(false);

  const getUserToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setTokenUser(token);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  const breakpoint = async (params, searchTerm) => {
    try {
      const response = await axios.get(
        `https://vinted-back-project.herokuapp.com/offers?${params}=${searchTerm}`
      );
      // return response.data.offers;
      if (response.data) {
        return response.data;
      } else {
        console.log("errors");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchChange = async (evt) => {
    evt.preventDefault();
    const results = await breakpoint("title", evt.target.value);
    // console.log(results);
    // console.log(results.count);
    let newResults = [];
    for (let i = 0; i < results.offers.length; i++) {
      console.log(results.offers[i].product_name);
      // console.log(results.offers[i].product_details[0].MARQUE);
      if (
        results.offers[i].product_name.indexOf(
          evt.target.value.toLowerCase()
        ) !== -1
      ) {
        newResults.push(results.offers[i]);
      }
    }
    setResultsSearch(newResults);
    console.log(newResults);
    // console.log(resultsSearch);
  };

  return (
    <>
      <Router>
        <Header
          tokenUser={tokenUser}
          getUserToken={getUserToken}
          handleChange={handleSearchChange}
        />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/login">
            <Login getUserToken={getUserToken} />
          </Route>
          <Route path="/signup">
            <Signup getUserToken={getUserToken} />
          </Route>
          <Route exact path="/">
            <Home resultsSearch={resultsSearch} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
