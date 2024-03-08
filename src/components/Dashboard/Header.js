import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated, setIsSearching }) => {
  return (
    <header>
      <h1>CUSTOMER DETAILS</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Customer</button>
        <button onClick={() => setIsSearching(true)}>Search Customer</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
