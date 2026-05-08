import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Badge } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

const Navbar = ({ searchTerm, setSearchTerm, handleLogout, quantity }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <TopRow>
        <Logo to="/">
          Fashion<span>Forge</span>
        </Logo>

        <Menu>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>

          <Link
            to="/orderdetails"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItemText>Orders</MenuItemText>
          </Link>

          {currentUser ? (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <LoginButton>Login</LoginButton>
            </Link>
          )}
        </Menu>
      </TopRow>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton>Search</SearchButton>
      </SearchBar>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #333;
  color: white;
  padding: 10px 12px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    padding: 15px 30px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #f0d080; /* gold — "Fashion" */

  span {
    color: #fff; /* white — "Forge" */
  }

  @media (min-width: 768px) {
    font-size: 24px;
  }

  &:hover {
    color: #c9a84c;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 4px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 4px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  &:hover {
    background-color: #777;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
`;

const MenuItemText = styled.p`
  margin: 0;
  font-size: 14px;
  color: white;

  &:hover {
    color: #ccc;
  }
`;

const LogoutButton = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const LoginButton = styled.button`
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #32cf0a;
  }
`;
