import React from 'react';
import styled from 'styled-components';

const Home = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description of Product 1.',
      price: '$99',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description of Product 2.',
      price: '$199',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is the description of Product 3.',
      price: '$299',
      image: 'https://via.placeholder.com/150'
    },
    // Add more products here...
  ];

  return (
    <Container>
      <Header>Our Products</Header>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price}</ProductPrice>
              <BuyButton>Add to Cart</BuyButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
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

const ProductName = styled.h2`
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