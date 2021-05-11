import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";

function App() {
  const [tokenUser, setTokenUser] = useState(Cookies.get("userToken") || null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState(false);
  const [rangeSlider, setRangeSlider] = useState([0, 5000]);
  // Slider

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-back-project.herokuapp.com/offers`,
        // "http://localhost:3200/offers",
        {
          params: {
            title: title,
            sort: sort ? "price-desc" : "price-asc",
            priceMin: rangeSlider[0],
            priceMax: rangeSlider[1],
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [title, sort, rangeSlider]);

  const setUserToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
      setTokenUser(token);
    } else {
      Cookies.remove("userToken");
      setTokenUser(null);
    }
  };

  const handleSearchChange = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
  };

  const handleCheckFilter = (e) => {
    e.preventDefault();
    setSort(!sort);
  };

  return (
    <>
      <Router>
        <Header
          sort={sort}
          tokenUser={tokenUser}
          setUserToken={setUserToken}
          handleSearch={handleSearchChange}
          setSort={handleCheckFilter}
          rangeSlider={rangeSlider}
          setRangeSlider={setRangeSlider}
        />
        <Switch>
          <Route exact path="/">
            <Home data={data} isLoading={isLoading} />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/login">
            <Login setUserToken={setUserToken} />
          </Route>
          <Route path="/signup">
            <Signup setUserToken={setUserToken} />
          </Route>
          <Route path="/publish">
            {tokenUser ? (
              <Publish tokenUser={tokenUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
