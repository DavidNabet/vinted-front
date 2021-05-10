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
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(20);

  // const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-back-project.herokuapp.com/offers`,
        {
          params: {
            title: title,
            sort: sort ? "price-desc" : "price-asc",
            priceMin: priceMin,
            // priceMax: priceMax,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, sort, priceMin]);

  const getUserToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setTokenUser(token);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  const handleSearchChange = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
    // console.log(resultsSearch);
  };

  const handleCheckFilter = (e) => {
    e.preventDefault();
    setSort(!sort);
  };

  const handlePriceMin = (e) => {
    e.preventDefault();
    setPriceMin(Number(e.target.value));
  };

  const handlePriceMax = (e) => {
    e.preventDefault();
    setPriceMax(Number(e.target.value));
  };

  return (
    <>
      <Router>
        <Header
          sort={sort}
          tokenUser={tokenUser}
          getUserToken={getUserToken}
          handleSearch={handleSearchChange}
          setSort={handleCheckFilter}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={handlePriceMin}
          setPriceMax={handlePriceMax}
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
