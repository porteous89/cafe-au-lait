import './App.css';
import "./assets/css/styles.css";
import Header from './components/Header';
import Menu from './components/Menu';
import Item from './components/Item';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import CafeTables from './pages/CafeTables';

function App() {
  return (
    <div className="App">
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path = "/item" element={<Item/>} />
        <Route path = "/cafe-tables" element={<CafeTables/>} />
      </Routes>
    </Router>
  </div>
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
