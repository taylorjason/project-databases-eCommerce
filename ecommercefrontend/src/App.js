import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Customers from './components/Customers';
import Users from './components/Users';

function App() {
  const [page, setPage] = useState('users');

  return (
    <div className="App">
      <div className="grid-container">
        <div className="navBar">
          <Button title={'Users Button'} page={'users'} setPage={setPage} />
          <Button
            title={'Customers Button'}
            page={'customers'}
            setPage={setPage}
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
        <div className="Footer">Footer</div>
        <div className="main">
          <div className="search">Search</div>
          <div className="mainDisplay">
            Main Display
            {page === 'users' ? <Users id="1" /> : null}
            {page === 'customers' ? <Customers /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
