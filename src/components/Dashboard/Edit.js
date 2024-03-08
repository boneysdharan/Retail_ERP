import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ customers, selectedCustomer, setCustomers, setIsEditing }) => {
  const id = selectedCustomer.id;

  const [firstName, setFirstName] = useState(selectedCustomer.firstName);
  const [lastName, setLastName] = useState(selectedCustomer.lastName);
  const [email, setEmail] = useState(selectedCustomer.email);
  const [balance, setBalance] = useState(selectedCustomer.balance);
  const [add, setAdd] = useState();
  const [deduct, setDeduct] = useState();
  const [updated_balance, setUpdated_balance] = useState(selectedCustomer.balance);
  const [date, setDate] = useState(selectedCustomer.date);
  const [date_balance_change,setDate_balance_change] = useState('');

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !balance || !add || !deduct || !updated_balance || !date || !date_balance_change) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

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

    localStorage.setItem('customers_data', JSON.stringify(customers));
    setCustomers(customers);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${customer.firstName} ${customer.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Customer</h1>
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
          value={parseInt(balance)}
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
          value={parseInt(deduct)}
          onChange={e => setDeduct(parseInt(e.target.value))}
        />
        <label htmlFor="updated_balance">Updated Balance ($)</label>
        <input
          id="updated_balance"
          type="number"
          name="updated_balance"
          value={parseInt(balance)}
          onChange={e => setBalance(e.target.value)}
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
          <input type="submit" value="Update" onClick={e=>setUpdated_balance(parseInt(updated_balance)+parseInt(add)-parseInt(deduct))}/>
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
