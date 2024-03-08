import React from 'react';
const Table = ({ customers, handleEdit, handleDelete, handleRead }) => {
  
  customers.forEach((customer, i) => {
    customer.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Added Balance</th>
            <th>Deducted Balance</th>
            <th>Updated Balance</th>
            <th>Date</th>
            <th>Date of Updating Balance</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, i) => (
              <tr key={customer.id}>
                <td>{i + 1}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{formatter.format(customer.balance)}</td>
                <td>{formatter.format(customer.add)}</td>
                <td>{formatter.format(customer.deduct)}</td>
                <td>{formatter.format(customer.updated_balance)}</td>
                <td>{customer.date} </td>
                <td>{customer.date_balance_change}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(customer.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleRead(customer.id)}
                    className="button muted-button"
                  >
                    View
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No customers</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
