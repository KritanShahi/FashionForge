/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
        setOrderDetails(response.data);

        // If a delivery date exists, prefill it
        if (response.data.deliveryDate) {
          setDeliveryDate(response.data.deliveryDate.split('T')[0]); // Format date for input field
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();

  }, [id]);

  
  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, { status: newStatus });
      alert(`Order status updated to ${newStatus}!`);
      setOrderDetails({ ...orderDetails, status: newStatus });
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
    }
  };
  

  // Save delivery date
  const handleSaveDeliveryDate = async () => {
    if (!deliveryDate) {
      alert('Please select a delivery date!');
      return;
    }

    try {
      setIsSaving(true);
      await axios.put(`http://localhost:8080/api/orders/${id}`, {
        ...orderDetails,
        deliveryDate,
      });
      alert('Delivery date updated successfully!');
      setIsSaving(false);
    } catch (error) {
      console.error('Error updating delivery date:', error);
      setIsSaving(false);
    }
  };

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      
      <p><strong>Customer Name:</strong> {orderDetails.userId?.name}</p>

      <p><strong>Products:</strong></p>
      <ul>
        {orderDetails.products.map((product, index) => (
          <li key={index}>
            <strong>Name:</strong> {product.productId?.name} <br />
            <strong>Description:</strong> {product.productId?.description} <br />
            <strong>Price:</strong> ${product.productId?.price} <br />
            <strong>Quantity:</strong> {product.quantity}
          </li>
        ))}
      </ul>
      
      <p><strong>Total:</strong> ${orderDetails.total}</p>
      <p><strong>Status:</strong> {orderDetails.status}</p>
      <p><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
      <p><strong>Contact Number:</strong> {orderDetails.contactNumber}</p>

      <div>
        <label><strong>Delivery Date:</strong></label>
        <input 
          type="date" 
          value={deliveryDate} 
          onChange={(e) => setDeliveryDate(e.target.value)} 
        />
        <button 
          onClick={handleSaveDeliveryDate} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Delivery Date'}
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
  <button onClick={() => navigate('/admin/order')}>Cancel</button>
  <button onClick={() => handleUpdateStatus('Shipped')}>Mark as Shipped</button>
</div>

    </div>
  );
};

export default OrderDetails;
*/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
        setOrderDetails(response.data);

        // If a delivery date exists, prefill it
        if (response.data.deliveryDate) {
          setDeliveryDate(response.data.deliveryDate.split('T')[0]); // Format date for input field
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Handle update order status
  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}`, { status: newStatus });
      alert(`Order status updated to ${newStatus}!`);
      setOrderDetails({ ...orderDetails, status: newStatus });
    } catch (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
    }
  };

  // Save delivery date
  const handleSaveDeliveryDate = async () => {
    if (!deliveryDate) {
      alert('Please select a delivery date!');
      return;
    }

    try {
      setIsSaving(true);
      await axios.put(`http://localhost:8080/api/orders/${id}`, {
        ...orderDetails,
        deliveryDate,
      });
      alert('Delivery date updated successfully!');
      setIsSaving(false);
    } catch (error) {
      console.error('Error updating delivery date:', error);
      setIsSaving(false);
    }
  };

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <Container>
      <Title>Order Details</Title>
      
      <DetailRow>
        <strong>Customer Name:</strong> {orderDetails.userId?.name || 'N/A'}
      </DetailRow>

      <DetailRow>
        <strong>Products:</strong>
        <ProductList>
          {orderDetails.products && orderDetails.products.length > 0 ? (
            orderDetails.products.map((product, index) => (
              <ProductItem key={index}>
                <strong>Name:</strong> {product.productId?.name || 'Unknown Product'} <br />
                <strong>Description:</strong> {product.productId?.description || 'No description'} <br />
                <strong>Price:</strong> ${product.productId?.price || 'N/A'} <br />
                <strong>Quantity:</strong> {product.quantity || 0}
              </ProductItem>
            ))
          ) : (
            <p>No products available for this order.</p>
          )}
        </ProductList>
      </DetailRow>
      
      <DetailRow>
        <strong>Total:</strong> ${orderDetails.total || 'N/A'}
      </DetailRow>
      
      <DetailRow>
        <strong>Status:</strong> {orderDetails.status || 'N/A'}
      </DetailRow>
      
      <DetailRow>
        <strong>Shipping Address:</strong> {orderDetails.shippingAddress || 'N/A'}
      </DetailRow>

      <DetailRow>
        <strong>Contact Number:</strong> {orderDetails.contactNumber || 'N/A'}
      </DetailRow>

      <DeliveryDateSection>
        <Label>Delivery Date:</Label>
        <DateInput 
          type="date" 
          value={deliveryDate} 
          onChange={(e) => setDeliveryDate(e.target.value)} 
        />
        <SaveButton 
          onClick={handleSaveDeliveryDate} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Delivery Date'}
        </SaveButton>
      </DeliveryDateSection>

      <ActionButtons>
        <CancelButton onClick={() => navigate('/admin/order')}>Cancel</CancelButton>
        <StatusButton onClick={() => handleUpdateStatus('Shipped')}>Mark as Shipped</StatusButton>
      </ActionButtons>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const DetailRow = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ProductItem = styled.li`
  margin-bottom: 10px;
`;

const DeliveryDateSection = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

const DateInput = styled.input`
  font-size: 16px;
  padding: 5px;
  margin-right: 10px;
`;

const SaveButton = styled.button`
  background-color: #2196F3;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const StatusButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default OrderDetails;

