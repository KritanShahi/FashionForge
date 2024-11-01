/*
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products'); // Replace with your backend URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
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
        <LogoutButton>Logout</LogoutButton>
      </Header>

      <PageTitle>Our Products</PageTitle>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <BuyButton>Add to Cart</BuyButton>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </Container>
  );
};*/import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import  { Search,ShoppingCartOutlined} from "@mui/icons-material"
import { useSelector } from "react-redux";
import Navbar from '../component/Navbar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const quantity = useSelector(state=>state.cart.quantity);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
      navigate('/signup'); // Redirect to signup page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>

<Navbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  handleLogout={handleLogout}
  quantity={quantity}
/>      

      <PageTitle>Our Products</PageTitle>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <BuyButton>Add to Cart</BuyButton>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </Container>
  );
};


/*<Header>
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
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <Link to="/cart">
      <MenuItem> <Badge badgeContent={quantity} color="secondary">
<ShoppingCartOutlined></ShoppingCartOutlined>

      </Badge></MenuItem>
      </Link>*/


// Styled Components

const MenuItem=styled.div`
cursor:pointer;
font-size:14px;
margin-left:25px;
`


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  
  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
  }
`;

const SearchButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export default Home;


/*
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'WOXEN jacket', description: 'Men regular solid jacket', price: '$99', image: 'https://t.ly/7YEsg' },
    { id: 2, name: 'Puma cap', description: 'Blue color cap', price: '$199', image: 'https://t.ly/V1D2U' },
    { id: 3, name: 'Lugaz man T-shirt', description: 'Green T-shirt', price: '$299', image: 'https://i.ibb.co/gwcWTxL/1-20.jpg' },
    { id: 4, name: 'Denim pants', description: 'Black pant', price: '$200', image: 'https://t.ly/QTpRX' },
    // Add more products here...
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
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
        <LogoutButton>Logout</LogoutButton>
      </Header>

      <PageTitle>Our Products</PageTitle>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <BuyButton>Add to Cart</BuyButton>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </Container>
  );
};*/