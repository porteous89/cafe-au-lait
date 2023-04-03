import { Container, Card } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Container fluid className="home-container">
      <div className="home">
        <Card className="welcome-card">
          <h1>Welcome to Cafe Du Lait</h1>
          <p>A small French cafe off the water, in the heart of downtown.</p>
          <p>
            Enjoy a cup of coffee and a pastry while you take in the view and
            relaxed atmosphere
          </p>
          <button onClick={handleClick} className="btn btn-primary">
            Order Now
          </button>
        </Card>
      </div>
    </Container>
  );
};

export default Home;
