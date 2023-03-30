import React from 'react';
import { Jumbotron, Button, Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from '../components/Cart';
import CategoryList from '../components/CategoryMenu';
import ItemList from '../components/ItemList';


import './home.css';

const Home = ({name}) => {
    return (
        <div className='home'>
        <Container fluid className='home'>
            {/* <Jumbotron> */}
           <CategoryList />
              <ItemList />

                <h1>Welcome to {name}</h1>
                <p>
                   A small French cafe in the heart of downtown. 
                </p>
                <p>
                    <Button variant="primary"><a href='productlist'>Order Now</a></Button>
                </p>
           {/* </Jumbotron> */}
        </Container>
        </div>
    );
};

export default Home;