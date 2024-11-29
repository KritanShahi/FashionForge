/*

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { incrementQuantity, decrementQuantity } from '../redux/cartRedux';
import BuyNow from './BuyNow'; // Import BuyNow component


const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to toggle the BuyNow form

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('You need to log in to proceed to checkout.');
      return;
    }
    setShowCheckoutForm(true); // Show the checkout form
  };

  return (
    <Container>
      {showCheckoutForm ? (
        <BuyNow
          onClose={() => setShowCheckoutForm(false)}
          product={{
            _id: 'cart',
            price: cartTotal,
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};*/
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { incrementQuantity, decrementQuantity, resetCart } from '../redux/cartRedux'; // Import resetCart action
import BuyNow from './BuyNow'; // Import BuyNow component

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to toggle the BuyNow form

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('You need to log in to proceed to checkout.');
      return;
    }
    setShowCheckoutForm(true); // Show the checkout form
  };

  // Calculate total quantity in the cart
  const totalQuantity = cartProducts.reduce((acc, product) => acc + product.quantity, 0);

  // Handle successful order placement and reset cart
  /*const handleOrderSuccess = () => {
    alert("Order placed successfully!");
    dispatch(resetCart()); // Reset cart quantities
    setShowCheckoutForm(false); // Close checkout form
  };*/

  const handleOrderSuccess = () => {
    alert("Order placed successfully!");
    dispatch(resetCart()); // Clear the cart
    setShowCheckoutForm(false); // Close the checkout form
    navigate('/'); // Redirect to the homepage
  };
  return (
    <Container>
      {showCheckoutForm ? (
        <BuyNow
          onClose={() => setShowCheckoutForm(false)}
          product={{
            _id: 'cart',
            price: cartTotal,
          }}
          onOrderSuccess={handleOrderSuccess} // Pass the success handler to BuyNow
        />
      ) : (
        <>
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
                <SummaryText>Total Quantity: {totalQuantity}</SummaryText> {/* Show total quantity */}
                <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
              </Summary>
            </>
          ) : (
            <EmptyCart>
              <p>Your cart is currently empty.</p>
              <Link to="/">Continue Shopping</Link>
            </EmptyCart>
          )}
        </>
      )}
    </Container>
  );
};




export default Cart;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Total = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
  text-align: right;
`;


const OrderForm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const OrderSummary = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

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