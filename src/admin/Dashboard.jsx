
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalProductsSold: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/dashboard-stats');
        console.log(response.data);
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load dashboard stats.');
        setLoading(false);
      }
    };
    fetchStats();
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

      <RecentActivity>
        <h3>Recent Orders</h3>
        <StyledTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.userDetails.name}</td>
                <td>{order.userDetails.email}</td>
                <td>{order.userDetails.phone}</td>
                 <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </RecentActivity>
    </MainContent>
  );
};

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

const RecentActivity = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
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
