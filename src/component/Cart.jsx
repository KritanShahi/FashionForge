import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { incrementQuantity, decrementQuantity } from '../redux/cartRedux';
import axios from 'axios';


const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.currentUser); // Assuming user state exists
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  

  const handleCheckout = async () => {
    if (!user) {
      alert('You need to log in to proceed to checkout.');
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/orders', {
        userId: user._id,
        products: cart.products.map(({ _id, quantity }) => ({
          productId: _id,
          quantity,
        })),
        total: cart.total,
      });

      alert('Order placed successfully!');
      navigate('/'); // Redirect to home or order confirmation page
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Something went wrong. Please try again.');
    }
  };


  return (
    <Container>
      <Title>Your Shopping Cart</Title>
      {cartProducts.length > 0 ? (
        <>
          <CartItems>
            {cartProducts.map((product) => (
              <CartItem key={product._id}>
                <Image src={product.image} alt={product.name} />
                <Details>
                  <ProductName>{product.title}</ProductName>
                  <UnitPrice>Unit Price: ${product.price.toFixed(2)}</UnitPrice>
                  <Subtotal>
                    Subtotal: ${(product.price * product.quantity).toFixed(2)}
                  </Subtotal>
                  <QuantityContainer>
                    <QuantityButton onClick={() => handleDecrement(product._id)}>-</QuantityButton>
                    <Quantity>{product.quantity}</Quantity>
                    <QuantityButton onClick={() => handleIncrement(product._id)}>+</QuantityButton>
                  </QuantityContainer>
                </Details>
              </CartItem>
            ))}
          </CartItems>
          <Summary>
            <SummaryText>Total: ${cartTotal.toFixed(2)}</SummaryText>
            <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
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

const UnitPrice = styled.p`
  font-size: 14px;
  color: #999;
`;

const Subtotal = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Quantity = styled.span`
  font-size: 16px;
  margin: 0 10px;
`;

const QuantityButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #555;
  }
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