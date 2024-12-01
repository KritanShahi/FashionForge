
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/*
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle status change (including canceling an order)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      updatedOrder.status = newStatus;

      // If the status is "Delivered", add the delivery date
      updatedOrder.deliveryDate = newStatus === 'Delivered' ? '2024-12-25' : null;

      await axios.put(`http://localhost:8080/api/orders/${orderId}`, updatedOrder);
      // Update the order in state after successful update
      setOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to cancel an order
  const cancelOrder = async (orderId) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      updatedOrder.status = 'Cancelled';  // Update the status to 'Cancelled'

      // Make PUT request to cancel the order
      await axios.put(`http://localhost:8080/api/orders/${orderId}/cancel`, updatedOrder);
      
      // Update the state with the cancelled order
      setOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <Container>
         <h2>Order Management</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total</th>
              <th>Delivery Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name || 'N/A'}</td> {/* Display customer name 
                <td>
                  {order.products?.length > 0
                    ? order.products.map(product => product.productId?.name).join(', ')  // Access product name
                    : 'N/A'}
                </td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>
                  {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                  {/* Format and display the delivery date 
                </td>
                <td>
                  {order.status !== 'Cancelled' && (
                    <>
                      <ActionButton onClick={() => cancelOrder(order._id)}>Cancel Order</ActionButton>
                      <ActionButton onClick={() => navigate(`/admin/order/${order._id}`)}>View</ActionButton>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

*/
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle status change (including canceling an order)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      updatedOrder.status = newStatus;

      // If the status is "Delivered", add the delivery date
      updatedOrder.deliveryDate = newStatus === 'Delivered' ? '2024-12-25' : null;

      await axios.put(`http://localhost:8080/api/orders/${orderId}`, updatedOrder);
      // Update the order in state after successful update
      setOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Function to cancel an order
  const cancelOrder = async (orderId) => {
    try {
      const updatedOrder = orders.find((order) => order._id === orderId);
      updatedOrder.status = 'Cancelled';  // Update the status to 'Cancelled'

      // Make PUT request to cancel the order
      await axios.put(`http://localhost:8080/api/orders/${orderId}/cancel`, updatedOrder);
      
      // Update the state with the cancelled order
      setOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <Container>
      <h2>Order Management</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total</th>
              <th>Delivery Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name || 'N/A'}</td> {/* Display customer name */}
                <td>
                  {order.products?.length > 0
                    ? order.products.map(product => product.productId?.name).join(', ')  // Access product name
                    : 'N/A'}
                </td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>
                  {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                  {/* Format and display the delivery date */}
                </td>
                <td>
                  {/* Show action buttons only if the order is not delivered or cancelled */}
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <>
                      <ActionButton onClick={() => cancelOrder(order._id)}>Cancel Order</ActionButton>
                      <ActionButton onClick={() => navigate(`/admin/order/${order._id}`)}>View</ActionButton>
                    </>
                  )}
                  {/* Show only "View" button for delivered or cancelled orders */}
                  {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                    <ActionButton onClick={() => navigate(`/admin/order/${order._id}`)}>View</ActionButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};


// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default OrderManagement;


