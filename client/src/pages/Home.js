import React from 'react';
import { Card, Button, Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import './home.css';

const Home = ({name}) => {
    return (
        <Container fluid className='home'>
            <div className='home'>
            <Card>
                <div>
                <h1>Welcome to Cafe Du Lait</h1>
                <p>
                   A small French cafe in the heart of downtown. 
                </p>
                <p>
                    <Button variant="primary"><a href='itemlist'>Order Now</a></Button>
                </p>
                </div>
           </Card>
           </div>
        </Container>
    );
};

export default Home;