import './App.css';
import "./assets/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

import Nav from './components/Nav/index.js';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import CafeTables from './pages/CafeTables';
import ProductItem from './components/ProductItem/index.js';
import CategoryMenu from './components/CategoryMenu/index.js';
import ItemList from './components/ItemList/index.js';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
    <div>
      <StoreProvider>
        <Nav name="Cafe Du Lait"/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<>
            <CategoryMenu />
            {/* <ProductItem /> */}
            <ItemList />
          </>} />
          <Route exact path="/cafe-tables" element={<CafeTables />} />
        </Routes>
      </StoreProvider>
    </div>
    <Footer />
    </Router>
    </ApolloProvider>
  );
};

export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// Stripe API function
// function App() {
//   return (
//     <div className="App">
//       <Elements stripe={stripePromise}>
//         <PaymentForm amount={5000} />
//       </Elements>
//     </div>
//   );
// }

// export default App
