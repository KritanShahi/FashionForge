/*import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalProductsSold: 0,
    recentOrders: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stats for the dashboard
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/dashboard-stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard stats.');
      }
    };

    // Fetch recent orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/orders');
        console.log('Fetched Orders:', response.data); // Debugging the response structure
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to load orders.');
      }
    };

    fetchStats();
    fetchOrders();
  }, []);

  if (loading) return <MainContent>Loading...</MainContent>;
  if (error) return <MainContent>{error}</MainContent>;

  return (
    <MainContent>
      <h2>Dashboard</h2>
      <CardContainer>
        <Card>
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers.toLocaleString()}</p>
        </Card>
        <Card>
          <h3>Products</h3>
          <p>{stats.totalProducts.toLocaleString()}</p>
        </Card>
        <Card>
          <h3>Total Products Sold</h3>
          <p>{stats.totalProductsSold.toLocaleString()}</p>
        </Card>
      </CardContainer>

      <h2>Recent Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total</th>
              <th>DeliveryDate</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                {/* Debug: Check if userDetails exists 
                <td>{order.name || 'N/A'}</td>
                <td>
                  {order.products?.length > 0
                    ? order.products.map(product => product.productId?.name).join(', ')  // Access product name
                    : 'N/A'}
                </td>
                <td>{order.status}</td>
                <td>{order.total || 'N/A'}</td>
           <td>     {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</td>
              
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </MainContent>
  );
};

// Styled Components (same as before)
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9fafc;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #eef2ff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #eef2ff;
    font-weight: bold;
  }
  tbody tr:hover {
    background-color: #f4f5fc;
  }
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export default Dashboard;
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalProductsSold: 0,  // Keep this for the total products sold from delivered orders
    recentOrders: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch stats for the dashboard
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/dashboard-stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard stats.');
      }
    };

    // Fetch recent orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/orders');
        console.log('Fetched Orders:', response.data); // Debugging the response structure
        setOrders(response.data);

        // Calculate total products sold for delivered orders
        const deliveredOrders = response.data.filter(order => order.status === 'Delivered');
        const totalProductsSold = deliveredOrders.reduce((sum, order) => {
          return sum + order.products.reduce((productSum, product) => productSum + product.quantity, 0);
        }, 0);

        setStats(prevStats => ({
          ...prevStats,
          totalProductsSold: totalProductsSold,  // Update the totalProductsSold state
        }));

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to load orders.');
      }
    };

    fetchStats();
    fetchOrders();
  }, []);

  if (loading) return <MainContent>Loading...</MainContent>;
  if (error) return <MainContent>{error}</MainContent>;

  return (
    <MainContent>
      <h2>Dashboard</h2>
      <CardContainer>
        <Card>
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers.toLocaleString()}</p>
        </Card>
        <Card>
          <h3>Products</h3>
          <p>{stats.totalProducts.toLocaleString()}</p>
        </Card>
        <Card>
          <h3>Total Products Sold</h3>
          <p>{stats.totalProductsSold.toLocaleString()}</p>
        </Card>
      </CardContainer>

      <h2>Recent Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name || 'N/A'}</td>
                <td>
                  {order.products?.length > 0
                    ? order.products.map(product => product.productId?.name).join(', ')  // Access product name
                    : 'N/A'}
                </td>
                <td>{order.status}</td>
                <td>{order.total || 'N/A'}</td>
                <td>
                  {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </MainContent>
  );
};

// Styled Components (same as before)
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9fafc;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #eef2ff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #eef2ff;
    font-weight: bold;
  }
  tbody tr:hover {
    background-color: #f4f5fc;
  }
`;

export default Dashboard;
