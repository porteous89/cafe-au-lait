import React from 'react';
import { Card, Button, Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from '../components/Cart';


import './home.css';

const Home = ({name}) => {
  
    return (
        <Container fluid className='home-container'>
        <div className='home'>
          <Card className="welcome-card">
            <div>
              <h1>Welcome to Cafe Du Lait</h1>
              <p>A small French cafe off the water, in the heart of downtown.</p>
              <p> Enjoy a cup of coffee and a pastry while you take in the view and relaxed atmosphere </p>
              <p>
                <Button variant="primary"><a href='/menu'>Order Now</a></Button>
              </p>
            </div>
          </Card>
        </div>
      </Container>      
    );
};

export default Home;