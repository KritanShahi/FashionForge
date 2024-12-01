/*
import React from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Clear user state
  };

  return (
    <Container>
      <Sidebar>
        <SidebarMenu>
          <SidebarActiveItem onClick={() => navigate('/admin')}>Dashboard</SidebarActiveItem>
          <SidebarItem onClick={() => navigate('/admin/product')}>Product Management</SidebarItem>
          <SidebarItem onClick={() => navigate('/admin/order')}>Order Management</SidebarItem>
        </SidebarMenu>
        <SidebarFooter>
          <SidebarItem onClick={handleLogout}>Logout</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <Content>
        <TopNavBar>
          <SearchBar placeholder="Search here..." />
          <Profile>
            <ProfileName>Admin</ProfileName>
            <ProfileImage src="https://tse4.mm.bing.net/th?id=OIG3.9vucNfp64foDhbSJD8nT&pid=ImgGn" alt="Profile" />
          </Profile>
        </TopNavBar>

        <MainContent>
          <Outlet /> {/* This renders Dashboard, OrderManagement, etc., based on the route 
        </MainContent>
      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f4f5fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky; /* Keeps the sidebar fixed *//*
  top: 0;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  padding: 10px 20px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #d1d9ff;
    color: #3f3d56;
  }
`;

const SidebarActiveItem = styled(SidebarItem)`
  background-color: #c7d2fe;
  font-weight: bold;
  color: #333;
`;

const SidebarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Pushes footer to the bottom 
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
  overflow: hidden; /* Prevent content overflow outside of main container 
`;

const TopNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.input`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: #f4f5fc;
  outline: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.span`
  font-weight: bold;
  color: #333;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9fafc;
  overflow-y: auto; /* Allows scrolling when content overflows 
`;

export default AdminDashboard;
*/

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // To detect the active route
  const [searchTerm, setSearchTerm] = useState(''); // To hold the search input

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Clear user state
  };

  // Update the search when the user types in the search bar
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search
  const handleSearch = () => {
    if (location.pathname.includes('product')) {
      // Search products by name
      searchProducts(searchTerm);
    } else if (location.pathname.includes('order')) {
      // Search orders by customer name
      searchOrders(searchTerm);
    }
  };

  // Function to search products
  const searchProducts = async (term) => {
    try {
      const response = await axios.get(`/api/products?name=${term}`);
      console.log(response.data);
      // Process the response and update the state with the filtered products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to search orders
  const searchOrders = async (term) => {
    try {
      const response = await axios.get(`/api/orders?customerName=${term}`);
      console.log(response.data);
      // Process the response and update the state with the filtered orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarMenu>
          <SidebarActiveItem onClick={() => navigate('/admin')}>Dashboard</SidebarActiveItem>
          <SidebarItem onClick={() => navigate('/admin/product')}>Product Management</SidebarItem>
          <SidebarItem onClick={() => navigate('/admin/order')}>Order Management</SidebarItem>
        </SidebarMenu>
        <SidebarFooter>
          <SidebarItem onClick={handleLogout}>Logout</SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <Content>
        <TopNavBar>
          <SearchBar
            placeholder={location.pathname.includes('product') ? "Search products..." : "Search customer..."}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
          />
          <Profile>
            <ProfileName>Admin</ProfileName>
            <ProfileImage src="https://tse4.mm.bing.net/th?id=OIG3.9vucNfp64foDhbSJD8nT&pid=ImgGn" alt="Profile" />
          </Profile>
        </TopNavBar>

        <MainContent>
          <Outlet /> {/* This renders Dashboard, OrderManagement, etc., based on the route */}
        </MainContent>
      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f4f5fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky; /* Keeps the sidebar fixed */
  top: 0;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  padding: 10px 20px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #d1d9ff;
    color: #3f3d56;
  }
`;

const SidebarActiveItem = styled(SidebarItem)`
  background-color: #c7d2fe;
  font-weight: bold;
  color: #333;
`;

const SidebarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Pushes footer to the bottom */
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
  overflow: hidden; /* Prevent content overflow outside of main container */
`;

const TopNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.input`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: #f4f5fc;
  outline: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.span`
  font-weight: bold;
  color: #333;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9fafc;
  overflow-y: auto; /* Allows scrolling when content overflows */
`;

export default AdminDashboard;
