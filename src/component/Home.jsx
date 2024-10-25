import React from 'react';
import styled from 'styled-components';
import seluImage from './selu.jpg';


const Home = () => {
  const products = [
    {
      id: 1,
      name: 'WOXEN jacket',
      description: 'Men regular solid jacket',
      price: '$99',
      image: 'https://t.ly/7YEsg'
    },
    {
      id: 2,
      name: 'Puma cap',
      description: 'Blue color cap',
      price: '$199',
      image: 'https://t.ly/V1D2U'
    },
    {
      id: 3,
      name: 'Lugaz man T-shirt',
      description: 'Green T-shirt',
      price: '$299',
      image: 'https://i.ibb.co/gwcWTxL/1-20.jpg'
    },
    // Add more products here...
    {
        id: 4,
        name: 'Denim pants',
        description: 'Black pant',
        price: '$200',
        image: 'https://t.ly/QTpRX'
    },
    {
        id: 5,
        name: 'Plaid Shirt',
        description: 'Black variant shirt',
        price: '$50',
        image: 'https://t.ly/PYih_'
    },
    {
        id: 6,
        name: 'Plain T-shirt',
        description: 'Plain coloured shirt',
        price: '$20',
        image: 'https://in.mt/7iE'
    },
    {
        id: 7,
        name: 'Hoodie',
        description: 'Colors: Black, Mélange Grey',
        price: '$100',
        image: 'https://in.mt/7iF'
    },
    {
        id: 8,
        name: 'Ribbed Parallel Trouser',
        description: 'Colors: Khaki, Black, Peach, Cream',
        price: '$10',
        image: 'https://in.mt/7iG'
    },{
      id: 9,
      name: 'Selisha',
      description: 'Plain coloured shirt',
      price: '$20',
      image: seluImage
  }
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