

// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux'; 

const Navbar = ({ searchTerm, setSearchTerm, handleLogout, quantity }) => {
  const currentUser = useSelector((state) => state.user.currentUser); 
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
      <Link to="/orderdetails" style={{ textDecoration: 'none', color: 'inherit' }}>
<p>OrderDetails</p>
</Link>

      <Menu>

        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Link>
        {currentUser ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <LoginButton>Login / Signup</LoginButton>
          </Link>
        )}
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

const LoginButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #32cf0a;
  }
`;


/*
const LoginButton = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: none;
  background-color: green;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;*/

/*
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux'; // Import to access user state

const Navbar = ({ searchTerm, setSearchTerm, handleLogout, quantity }) => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from state

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

      <Link to="/orderdetails" style={{ textDecoration: 'none', color: 'inherit' }}>
        <p>OrderDetails</p>
      </Link>

      <Menu>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Link>

        {currentUser ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <LoginButton>Login</LoginButton>
          </Link>
        )}
      </Menu>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

const LoginButton = styled.button`
  margin-left: 20px;
  padding: 5px 10px;
  border: none;
  background-color: green;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;
*/