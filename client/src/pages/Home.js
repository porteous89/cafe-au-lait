import React from 'react';
import { Jumbotron, Button, Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/css/home.css';

const Home = ({name}) => {
    return (
        <Container fluid className='home'>
            <Jumbotron>
                <h1>Welcome to {name}</h1>
                <p>
                   A small French cafe in the heart of downtown. 
                </p>
                <p>
                    <Button variant="primary"><a href='menu'>Order Now</a></Button>
                </p>
            </Jumbotron>
        </Container>
    );
};

export default Home;