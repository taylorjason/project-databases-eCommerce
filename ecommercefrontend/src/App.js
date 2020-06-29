import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Customers from './components/Customers';
import Users from './components/Users';

function App() {
  const [page, setPage] = useState('customers');

  return (
    <div className="App">
      <div class="grid-container">
        <div class="navBar">
          <Button title={'Users Button'} page = {'users'} setPage={setPage}/>
          <Button
            title={'Customers Button'}
            page = {'customers'} setPage={setPage}
          />
          {/* <Button
            title={'Manufacturers Button'}
            onClick={clickHandler('manufacturers')}
          />
          <Button
            title={'Purchase Order Button'}
            onClick={() => setPage('salesOrder')}
          />
          <Button
            title={'Sales Order Button'}
            onClick={() => setPage('salesOrder')}
          /> */}
        </div>
        <div class="Footer">Footer</div>
        <div class="main">
          <div class="search">Search</div>
          <div class="mainDisplay">
            Main Display
            {page === 'users' ? <Users /> : null}
            {page === 'customers' ? <Customers /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
