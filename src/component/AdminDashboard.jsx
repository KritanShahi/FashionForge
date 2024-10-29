import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar>
        <SidebarMenu>
          <SidebarActiveItem onClick={() => navigate('/admin')}>Dashboard</SidebarActiveItem>
          <SidebarItem onClick={() => navigate('/admin/order')}>Order Management</SidebarItem>
          <SidebarItem onClick={() => navigate('/admin/product')}>Product Management</SidebarItem>
          <SidebarItem onClick={() => navigate('/admin/customer')}>Customer Management</SidebarItem>
          <SidebarItem onClick={() => console.log("Navigate to Comments")}>Messages</SidebarItem>
          <SidebarItem onClick={() => console.log("Navigate to Share")}>Transactions</SidebarItem>
        </SidebarMenu>
        <SidebarFooter>

          <SidebarItem onClick={() => console.log("Logout")}>Logout</SidebarItem>
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
  height: 100vh;
  background-color: #f4f5fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
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
`;

export default AdminDashboard;
