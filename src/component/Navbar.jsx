// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

const Navbar = ({ searchTerm, setSearchTerm, handleLogout, quantity }) => {
  return (
    <Container>
      <Logo>Fashion Forge</Logo>
      <SearchBar>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton>Search</SearchButton>
      </SearchBar>
      <Link to="/cart">
        <MenuItem>
          <Badge badgeContent={quantity} color="secondary">
            <ShoppingCartOutlined />
          </Badge>
        </MenuItem>
      </Link>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Navbar;


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f8f8;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #333;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    padding: 5px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const MenuItem = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 20px;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
`;
