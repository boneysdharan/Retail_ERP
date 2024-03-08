import React, { useState } from 'react';
import exportFromJSON from 'export-from-json';
const Read = ({ customers, selectedCustomer, setCustomers, setIsViewing }) => {
  const id = selectedCustomer.id;

  const [firstName] = useState(selectedCustomer.firstName);
  const [lastName] = useState(selectedCustomer.lastName);
  const [email] = useState(selectedCustomer.email);
  const [balance] = useState(selectedCustomer.balance);
  const [add] = useState(selectedCustomer.add);
  const [deduct] = useState(selectedCustomer.deduct);
  const [updated_balance] = useState(selectedCustomer.updated_balance);
  const [date] = useState(selectedCustomer.date);
  const [date_balance_change] = useState(selectedCustomer.date_balance_change);

  const handleRead = e => {
    e.preventDefault();

    const customer = {
      id,
      firstName,
      lastName,
      email,
      balance,
      add,
      deduct,
      updated_balance,
      date,
      date_balance_change
    };

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id === id) {
        customers.splice(i, 1, customer);
        break;
      }
    }

    localStorage.getItem('customers_data', JSON.stringify(customers));
    setCustomers(customers);
    setIsViewing(false);

    const data=JSON.parse(localStorage.getItem('customers_data'));
    const filename='localData'
    const exportType = exportFromJSON.types.csv
    exportFromJSON({data,filename,exportType})
  };

  return (
    <div className="small-container">
      <form onSubmit={handleRead}>
        <h1>View Customer</h1>
        <label htmlFor="firstName">First Name:{firstName}</label>
        <label htmlFor="lastName">Last Name:{lastName}</label>
        <label htmlFor="email">Email:{email}</label>
        <label htmlFor="balance">Balance($):{balance}</label>
        <label htmlFor="Added balance">Added Balance($):{add}</label>
        <label htmlFor="Deducted balance">Deducted Balance($):{deduct}</label>
        <label htmlFor="Updated balance">Updated Balance($):{updated_balance}</label>
        <label htmlFor="date">Date:{date}</label>
        <label htmlFor="date">Date of Updating Balance:{date_balance_change}</label>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Download Data in Excel Sheet" onClick={exportFromJSON} /> 
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Exit View"
            onClick={() => setIsViewing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Read;
