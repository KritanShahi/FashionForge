import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const AdminDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {

    if (location.pathname.includes('product')) {
      searchProducts(searchTerm);

    } else if (location.pathname.includes('order')) {
      searchOrders(searchTerm);
    }
  };

  const searchProducts = async (term) => {
    try {

      const response = await axios.get(
        `/api/products?name=${term}`
      );

      console.log(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchOrders = async (term) => {
    try {

      const response = await axios.get(
        `/api/orders?customerName=${term}`
      );

      console.log(response.data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (

    <Container>



      {sidebarOpen && (
        <Overlay onClick={() => setSidebarOpen(false)} />
      )}



      <Sidebar sidebarOpen={sidebarOpen}>

        <SidebarTop>

          <Logo>Admin Panel</Logo>

          <CloseButton onClick={() => setSidebarOpen(false)}>
            <CloseIcon />
          </CloseButton>

        </SidebarTop>

        <SidebarMenu>

          <SidebarActiveItem
            onClick={() => {
              navigate('/admin');
              setSidebarOpen(false);
            }}
          >
            Dashboard
          </SidebarActiveItem>

          <SidebarItem
            onClick={() => {
              navigate('/admin/product');
              setSidebarOpen(false);
            }}
          >
            Product Management
          </SidebarItem>

          <SidebarItem
            onClick={() => {
              navigate('/admin/order');
              setSidebarOpen(false);
            }}
          >
            Order Management
          </SidebarItem>

        </SidebarMenu>

        <SidebarFooter>

          <SidebarItem onClick={handleLogout}>
            Logout
          </SidebarItem>

        </SidebarFooter>

      </Sidebar>


      <Content>

     

        <TopNavBar>

          <LeftSection>

            <MenuButton onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </MenuButton>

            <SearchBar
              placeholder={
                location.pathname.includes('product')
                  ? "Search products..."
                  : "Search customer..."
              }

              value={searchTerm}

              onChange={handleSearchChange}

              onKeyUp={(e) =>
                e.key === 'Enter' && handleSearch()
              }
            />

          </LeftSection>

          <Profile>

            <ProfileName>Admin</ProfileName>

            <ProfileImage
              src="https://tse4.mm.bing.net/th?id=OIG3.9vucNfp64foDhbSJD8nT&pid=ImgGn"
              alt="Profile"
            />

          </Profile>

        </TopNavBar>

  

        <MainContent>

          <Outlet />

        </MainContent>

      </Content>

    </Container>
  );
};



const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;



const Sidebar = styled.div`
  width: 260px;
  background-color: #f4f5fc;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;

  transition: 0.3s ease;

  z-index: 1000;

  @media (max-width: 768px) {

    position: fixed;

    top: 0;
    left: ${({ sidebarOpen }) =>
      sidebarOpen ? '0' : '-100%'};

    height: 100vh;

    box-shadow: 2px 0 10px rgba(0,0,0,0.15);
  }
`;



const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,0.4);

  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;


const SidebarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h2`
  font-size: 1.3rem;
  color: #333;
`;

const CloseButton = styled.button`
  display: none;

  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;



const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const SidebarItem = styled.div`
  padding: 12px 18px;

  font-size: 1rem;
  color: #333;

  cursor: pointer;

  border-radius: 10px;

  margin-bottom: 10px;

  transition: 0.2s;

  &:hover {
    background-color: #dbe2ff;
  }
`;

const SidebarActiveItem = styled(SidebarItem)`
  background-color: #c7d2fe;
  font-weight: bold;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
`;


const Content = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: #f9fafc;
`;



const TopNavBar = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px;

  background: white;

  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  gap: 15px;

  flex-wrap: wrap;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  flex: 1;
`;

const MenuButton = styled.button`
  display: none;

  border: none;
  background: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;

  padding: 10px 14px;

  border: none;
  border-radius: 8px;

  background-color: #f4f5fc;

  outline: none;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;



const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.span`
  font-weight: bold;
  color: #333;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;

  border-radius: 50%;

  margin-left: 10px;

  object-fit: cover;
`;



const MainContent = styled.div`
  flex: 1;

  padding: 15px;

  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 25px;
  }
`;

export default AdminDashboard;