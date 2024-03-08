import React, { useState } from 'react';
import Swal from 'sweetalert2';;

const Add = ({ customers, setCustomers, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [add, setAdd] = useState('');
  const [deduct, setDeduct] = useState('');
  const [updated_balance, setUpdated_balance] = useState('');
  const [date, setDate] = useState('');
  const [date_balance_change,setDate_balance_change] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !balance || !add || !deduct || !updated_balance || !date || !date_balance_change) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = customers.length + 1;
    const newCustomer = {
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

    customers.push(newCustomer);
    localStorage.setItem('customers_data', JSON.stringify(customers));
    setCustomers(customers);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Customer</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="balance">Balance ($)</label>
        <input
          id="balance"
          type="number"
          name="balance"
          min="0"
          value={balance}
          onChange={e => setBalance(e.target.value)}
        />
        <label htmlFor="balance">Add Amount ($)</label>
        <input
          id="add"
          type="number"
          name="add"
          min="0"
          value={parseInt(add)}
          onChange={e => setAdd(parseInt(e.target.value))}
        />
        <label htmlFor="balance">Deduct Amount ($)</label>
        <input
          id="deduct"
          type="number"
          name="deduct"
          min="0"
          value={deduct}
          onChange={e => setDeduct(e.target.value)}
        />
        <label htmlFor="updated_balance">Updated Balance ($)</label>
        <input
          id="updated_balance"
          type="number"
          name="updated_balance"
          min={balance}
          value={parseInt(updated_balance)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="date">Date of Updating Balance</label>
        <input
          id="date_balance_change"
          type="date"
          name="date of updating balance"
          value={date_balance_change}
          onChange={e => setDate_balance_change(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" onClick={e=>setUpdated_balance(parseInt(balance)+parseInt(add)-parseInt(deduct))} />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
