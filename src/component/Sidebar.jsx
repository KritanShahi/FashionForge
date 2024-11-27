import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import Navbar from '../component/Navbar';
import { Add, Remove } from '@mui/icons-material';
import CustomerReview from './CustomerReview';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html, #root {
    height: 100%;
  }
`;

const Sidebar= () => {

 

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar handleLogout={handleLogout} quantity={cartQuantity} />
        <CenteredContainer>
          <Content>
            <Image src={product.image} alt={product.name} />
            <Details>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>Rs {product.price}</ProductPrice>

            </Details>
          </Content>
        </CenteredContainer>
        <CustomerReview
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  flex: 1;
  max-width: 600px;
`;

const ProductName = styled.h1`
  font-size: 2rem;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Rating = styled.div`
  margin: 10px 0;
`;

const Stars = styled.span`
  font-size: 1.5rem;
  color: #ffdd00;
  margin-right: 10px;
`;

const LoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #ff4d4d;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const BuyNowButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5733;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e63e00;
  }
`;


export default Sidebar;