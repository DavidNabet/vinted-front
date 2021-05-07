import { useState, useEffect } from "react";
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
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-back-project.herokuapp.com/offers`,
        {
          params: {
            title: search,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  const getUserToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setTokenUser(token);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  const handleSearchChange = async (evt) => {
    evt.preventDefault();
    setSearch(evt.target.value);
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
          <Route path="/">
            <Home data={data} isLoading={isLoading} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
