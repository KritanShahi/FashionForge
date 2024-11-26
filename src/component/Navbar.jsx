

// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = ({ searchTerm, setSearchTerm, handleLogout, quantity }) => {
  return (
    <Container>
      <Logo to="/">Fashion Forge</Logo>
      
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton>Search</SearchButton>
      </SearchBar>
      
      <Menu>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Link>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Menu>
    </Container>
  );
};

export default Navbar;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #333;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #ccc;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8f8f8;
  padding: 5px 10px;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: none;
  outline: none;
  width: 200px;
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #555;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #ff1a1a;
  }
`;