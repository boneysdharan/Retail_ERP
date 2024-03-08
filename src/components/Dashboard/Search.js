import React,{useState} from 'react';
import {Form, InputGroup} from 'react-bootstrap'
const Search = (setIsSearching) => {
    const [search, setSearch] = useState('') 
    const data = JSON.parse(localStorage.getItem('customers_data'));
  
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null,
      });
    

  return (
    <div className="contain-table">
      <Form>
        <InputGroup classname="Search">
          <Form.Control onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Customer by Name'/>
        </InputGroup>
        <button style={{ marginLeft: '12px' }} value="Exit Search" onClick={() => setIsSearching="false"}>Exit Search</button>
      </Form>
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
          </tr>
        </thead>
        <tbody>
          { data.filter((customer) => {
                return search.toLowerCase() === '' ? customer : customer.firstName.toLowerCase().includes(search);
            }).map((customer, i) => (
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
