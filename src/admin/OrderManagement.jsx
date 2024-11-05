import React, { useState } from 'react';
import styled from 'styled-components';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', items: ['Product 1', 'Product 2'], total: '$298', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', items: ['Product 3'], total: '$299', status: 'Shipped' },
  ]);
  const [newOrder, setNewOrder] = useState({ customer: '', items: '', total: '', status: 'Pending' });
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrder = () => {
    if (editing) {
      const updatedOrders = [...orders];
      updatedOrders[editingIndex] = newOrder;
      setOrders(updatedOrders);
      setEditing(false);
      setEditingIndex(null);
    } else {
      setOrders([...orders, { ...newOrder, id: Date.now() }]);
    }
    setNewOrder({ customer: '', items: '', total: '', status: 'Pending' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleEdit = (index) => {
    setNewOrder(orders[index]);
    setEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  return (
    <Container>
      <h2>Order Management</h2>
      <Form>
        <Input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={newOrder.customer}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="items"
          placeholder="Items (comma-separated)"
          value={newOrder.items}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="total"
          placeholder="Total Amount"
          value={newOrder.total}
          onChange={handleInputChange}
        />
        <Select name="status" value={newOrder.status} onChange={handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        <Button onClick={handleAddOrder}>{editing ? 'Save' : 'Add Order'}</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.items.join(', ')}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
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

const Select = styled.select`
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

export default OrderManagement;
