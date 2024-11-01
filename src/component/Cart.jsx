// CartPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Container>
      <Title>Your Shopping Cart</Title>
      {cart.products.length > 0 ? (
        <>
          <CartItems>
            {cart.products.map((product) => (
              <CartItem key={product._id}>
                <Image src={product.image} alt={product.name} />
                <Details>
                  <ProductName>{product.title}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <Quantity>Quantity: {product.quantity}</Quantity>
                </Details>
              </CartItem>
            ))}
          </CartItems>
          <Summary>
            <SummaryText>Total: ${cart.total}</SummaryText>
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
          </Summary>
        </>
      ) : (
        <EmptyCart>
          <p>Your cart is currently empty.</p>
          <Link to="/">Continue Shopping</Link>
        </EmptyCart>
      )}
    </Container>
  );
};

export default Cart;

// Styles
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  padding: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const Details = styled.div`
  margin-left: 20px;
`;

const ProductName = styled.h2`
  font-size: 18px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
`;

const Quantity = styled.p`
  font-size: 16px;
`;

const Summary = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const SummaryText = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  padding: 10px;
  font-size: 18px;
  background-color: #333;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const EmptyCart = styled.div`
  text-align: center;
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
