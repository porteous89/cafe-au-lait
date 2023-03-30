import logo from './logo.svg';
import './App.css';
import "./assets/css/styles.css";
import Header from './components/Header';
import Menu from './components/Menu';
import Item from './components/Item';

function App() {
  return (
    <div>
      <Header name="Cafe Du Lait"/>
      <Menu name="Cold Drinks" menu={Item}/>
      <Menu name="Hot Drinks" menu={Item}/>
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
