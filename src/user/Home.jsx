import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle,keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductBanner from './ProductBanner';
import { useSelector } from "react-redux";
import Navbar from '../component/Navbar';
import Rating from '@mui/material/Rating'; // Import Rating component
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";






const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const quantity = useSelector(state => state.cart.quantity);

  const dispatch = useDispatch();





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


  const handleLogout = () => {
   
    dispatch(logout()); 
    navigate('/login');// Clear user state

  };

    // Extract images from products for the banner
    const productImages = products.map((product) => product.image);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleLogout={handleLogout}
          quantity={quantity}
        />
              <Banner>
          <BannerText>
          🚚 Free Shipping on orders above Rs 500! Limited time only. 🚚
          </BannerText>
        </Banner>
               {/* Dynamic Product Banner */}
               <ProductBanner productImages={productImages} />
        <PageTitle>Our Products</PageTitle>
        <ProductGrid>
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>Rs {product.price}</ProductPrice>
                  <StyledRating
                    name="product-rating"
                    value={product.rating || 4} // Set a default rating if not provided
                    precision={0.5}
                    readOnly
                  />
                </ProductInfo>
              </ProductCard>
            </Link>
          ))}
        </ProductGrid>
      </Container>
    </>
  );
};



// Keyframes for scrolling animation
const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Styled Components
const Banner = styled.div`
  background-color: #ffc107;
  color: #000;
  padding: 10px 0;
  overflow: hidden;
  position: relative;
`;

const BannerText = styled.div`
  display: inline-block;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: bold;
  animation: ${scroll} 10s linear infinite;
`;
// Global and Styled Components
const GlobalStyle = createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 20px 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  flex: 1;
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
  height: 250px;
  object-fit: contain;
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

const StyledRating = styled(Rating)`
  margin-top: 10px;
`;

export default Home;
