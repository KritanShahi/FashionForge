import React, { useState } from 'react';
import styled from 'styled-components';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCustomer = () => {
    if (editing) {
      const updatedCustomers = [...customers];
      updatedCustomers[editingIndex] = newCustomer;
      setCustomers(updatedCustomers);
      setEditing(false);
      setEditingIndex(null);
    } else {
      setCustomers([...customers, { ...newCustomer, id: Date.now() }]);
    }
    setNewCustomer({ name: '', email: '', phone: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleEdit = (index) => {
    setNewCustomer(customers[index]);
    setEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  return (
    <Container>
      <h2>Customer Management</h2>
      <Form>
        <Input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={newCustomer.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="phone"
          placeholder="Customer Phone"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddCustomer}>{editing ? 'Save' : 'Add Customer'}</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <ActionButton onClick={() => handleEdit(index)}>Edit</ActionButton>
                <ActionButton onClick={() => handleDelete(index)}>Delete</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #1976D2;
  }
`;

export default CustomerManagement;
