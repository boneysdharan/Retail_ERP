import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import Read from './View';
import Search from './Search'

import { customersData } from '../../data/index.js';

const Dashboard = ({ setIsAuthenticated }) => {
  const [customers, setCustomers] = useState(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('customers_data'));
    if (data !== null && Object.keys(data).length !== 0) setCustomers(data);
  }, []);

  const handleEdit = id => {
    const [customer] = customers.filter(customer => customer.id === id);

    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const handleRead = id => {
    const [customer] = customers.filter(customer => customer.id === id);
    setSelectedCustomer(customer);
    setIsViewing(true);
  }

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [customer] = customers.filter(customer => customer.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${customer.firstName} ${customer.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const customersCopy = customers.filter(customer => customer.id !== id);
        localStorage.setItem('customers_data', JSON.stringify(customersCopy));
        setCustomers(customersCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            setIsSearching={setIsSearching}
          />
          <Table
            customers={customers}
            handleEdit={handleEdit}
            handleRead={handleRead}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          customers={customers}
          setCustomers={setCustomers}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          customers={customers}
          selectedCustomer={selectedCustomer}
          setCustomers={setCustomers}
          setIsEditing={setIsEditing}
        />
      )}
      {isViewing && (
        <Read
          customers={customers}
          selectedCustomer={selectedCustomer}
          setCustomers={setCustomers}
          setIsViewing={setIsViewing}
        />
      )}
      {isSearching && (
        <Search
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      )}
    </div>
  );
};

export default Dashboard;
