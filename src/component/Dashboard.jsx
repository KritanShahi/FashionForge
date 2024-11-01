// src/Dashboard.js
import React from 'react';
import styled from 'styled-components';

const Dashboard = () => (
  <MainContent>
    <h2>Dashboard</h2>
    <CardContainer>
      <Card>
        <h3>Total Customer</h3>
        <p>50,120</p>
      </Card>
      <Card>
        <h3>Product</h3>
        <p>25,120</p>
      </Card>
      <Card>
        <h3>Total Product Sold</h3>
        <p>10,320</p>
      </Card>
    </CardContainer>
    <RecentActivity>
      <h3>Recent Activity</h3>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prem Shahi</td>
            <td>premshahi@gmail.com</td>
            <td>12345</td>
            <td>New</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>Deepa Chand</td>
            <td>deepachand@gmail.com</td>
            <td>20212</td>
            <td>Member</td>
            <td>Shipped</td>
          </tr>
          <tr>
            <td>Prakash Shahi</td>
            <td>prakashshahi@gmail.com</td>
            <td>213</td>
            <td>New</td>
            <td>Shipped</td>
          </tr>
          <tr>
            <td>Manisha Chand</td>
            <td>manishachand@gmail.com</td>
            <td>2023</td>
            <td>Member</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </StyledTable>
    </RecentActivity>
  </MainContent>
);

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