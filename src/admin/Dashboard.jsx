import React, { useState, useEffect } from 'react';
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

    const fetchStats = async () => {

      try {

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/dashboard-stats`
        );

        setStats(response.data);

      } catch {

        setError('Failed to load dashboard stats.');

      }
    };

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );

        setOrders(response.data);

        const deliveredOrders = response.data.filter(
          (order) => order.status === 'Delivered'
        );

        const totalProductsSold = deliveredOrders.reduce((sum, order) => {

          return (
            sum +
            order.products.reduce(
              (productSum, product) => productSum + product.quantity,
              0
            )
          );

        }, 0);

        setStats((prevStats) => ({
          ...prevStats,
          totalProductsSold,
        }));

        setLoading(false);

      } catch {

        setLoading(false);
        setError('Failed to load orders.');

      }
    };

    fetchStats();
    fetchOrders();

  }, []);

  if (loading) {
    return <MainContent>Loading...</MainContent>;
  }

  if (error) {
    return <MainContent>{error}</MainContent>;
  }

  return (

    <MainContent>

      <Title>Dashboard</Title>


      <CardContainer>

        <Card>

          <h3>Total Customers</h3>

          <p>
            {stats.totalCustomers.toLocaleString()}
          </p>

        </Card>

        <Card>

          <h3>Products</h3>

          <p>
            {stats.totalProducts.toLocaleString()}
          </p>

        </Card>

        <Card>

          <h3>Total Products Sold</h3>

          <p>
            {stats.totalProductsSold.toLocaleString()}
          </p>

        </Card>

      </CardContainer>

 

      <SectionTitle>Recent Orders</SectionTitle>

      <TableWrapper>

        <StyledTable>

          <thead>

            <tr>

              <th>Customer</th>
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
                    ? order.products
                        .map((product) => product.productId?.name)
                        .join(', ')
                    : 'N/A'}

                </td>

                <td>{order.status}</td>

                <td>
                  Rs {order.total || 'N/A'}
                </td>

                <td>

                  {order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString()
                    : 'N/A'}

                </td>

              </tr>

            ))}

          </tbody>

        </StyledTable>

      </TableWrapper>

    </MainContent>
  );
};



const MainContent = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;

  padding: 12px;

  background-color: #f9fafc;

  box-sizing: border-box;

  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;


const Title = styled.h2`
  margin-bottom: 20px;

  font-size: 1.5rem;
  font-weight: 600;

  color: #222;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionTitle = styled.h2`
  margin: 20px 0 15px;

  font-size: 1.3rem;
  font-weight: 600;

  color: #222;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
`;



const CardContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: 15px;

  margin-bottom: 25px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  padding: 20px;

  background-color: #ffffff;

  border-radius: 12px;

  text-align: center;

  box-shadow: 0 4px 10px rgba(0,0,0,0.08);

  transition: 0.3s ease;

  border: 1px solid #eee;

  h3 {
    margin-bottom: 10px;

    font-size: 1rem;
    color: #555;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;

    color: teal;
  }

  &:hover {
    transform: translateY(-3px);
  }

  @media (min-width: 768px) {

    h3 {
      font-size: 1.1rem;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;



const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  -webkit-overflow-scrolling: touch;

  border-radius: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 650px;

  border-collapse: collapse;

  background: white;

  overflow: hidden;

  th,
  td {
    padding: 12px;

    border: 1px solid #ddd;

    text-align: left;

    font-size: 13px;

    white-space: nowrap;
  }

  th {
    background-color: #eef2ff;

    font-weight: 600;

    color: #333;
  }

  tbody tr:hover {
    background-color: #f4f5fc;
  }

  @media (min-width: 768px) {

    th,
    td {
      padding: 14px 16px;
      font-size: 15px;
    }
  }
`;

export default Dashboard;