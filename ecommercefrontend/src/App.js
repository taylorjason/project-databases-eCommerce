import React, {useState} from 'react';
// import NavBar from './components/navBar';
import './App.css';


function App() {
  const [getPo, setPo] = useState(''); //Purchase Order
  const [getSo, setSo] = useState(''); //Sales Order
  const [getMan, setMan] = useState(''); //Manufacturer
  const [getUser, setUser] = useState(''); //User
  const [getCustomers, setCustomers] = useState(''); // Customers

  return (
    <div className="App">
      <div class="grid-container">
        <div class="navBar">
        </div>
        <div class="Footer">Footer</div>
        <div class="main">
          Main Body
          <div class="mainDisplay">Main Display</div>
          <div class="search">Search</div>
        </div>
      </div>
    </div>
  );
}

export default App;
