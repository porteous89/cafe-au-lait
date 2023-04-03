import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "../components/Cart";

import "./home.css";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Home = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (Auth.loggedIn()) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container fluid className="home">
      <div className="home">
        <div className="welcome-screen">
          <h1>Welcome to Cafe Du Lait</h1>
          <p>A small French cafe off the water, in the heart of downtown.</p>
          <p>
            Enjoy a cup of coffee and a pastry while you take in the view and
            relaxed atmosphere
          </p>
          <button onClick={handleClick} className="btn btn-primary">
            Order Now
          </button>
        </div>
        <Cart />
      </div>
    </Container>
  );
};

export default Home;
