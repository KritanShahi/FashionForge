import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import ManageProducts from './ProductManagement';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';

const AdminDashboard = () => (
  <DashboardWrapper>
    <Sidebar>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><NavLink to="/admin/products">Manage Products</NavLink></li>
          <li><NavLink to="/admin/orders">Manage Orders</NavLink></li>
          <li><NavLink to="/admin/customers">Manage Customers</NavLink></li>
        </ul>
      </nav>
    </Sidebar>
    <Content>
      <Routes>
        <Route path="/products" element={<ManageProducts />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/customers" element={<CustomerManagement />} />
      </Routes>
    </Content>
  </DashboardWrapper>
);

const DashboardWrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  
  h2 {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    padding: 15px 0;
    border-bottom: 1px solid #444;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #575757;
  }
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 20px;
  
  h2 {
    color: #333;
    font-size: 24px;
  }
`;

export default AdminDashboard;
