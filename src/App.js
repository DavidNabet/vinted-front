import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [pullData, setPullData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // "https://vinted-back-project.herokuapp.com/offers"
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>Downloading...</span>
  ) : (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home data={data} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
