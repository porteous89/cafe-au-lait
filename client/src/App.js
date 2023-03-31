import './App.css';
import "./assets/css/styles.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

import Header from './components/Header';
import Menu from './components/Menu';
import Item from './components/Item';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import CafeTables from './pages/CafeTables';

import Nav from './components/Nav';

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          <Route exact path="/cafe-tables" element={<CafeTables />} />
        </Routes>
      <Header name="Cafe Du Lait"/>
      <Menu name="Cold Drinks" menu={Item}/>
      <Menu name="Hot Drinks" menu={Item}/>
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
