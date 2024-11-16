import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { incrementQuantity, decrementQuantity } from '../redux/cartRedux';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  // const dispatch = useDispatch();

  // const handleIncrement = (productId) => {
  //   dispatch(incrementQuantity(productId));
  // };

  // const handleDecrement = (productId) => {
  //   dispatch(decrementQuantity(productId));
  // };

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
            <SummaryText>Total: ${cart.total.toFixed(2)}</SummaryText>
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

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { incrementQuantity, decrementQuantity } from '../redux/cartRedux';

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleIncrement = (productId) => {
//     dispatch(incrementQuantity(productId));
//   };

//   const handleDecrement = (productId) => {
//     dispatch(decrementQuantity(productId));
//   };

//   return (
//     <Container>
//       <Title>Your Shopping Cart</Title>
//       {cart.products.length > 0 ? (
//         <>
//           <CartItems>
//             {cart.products.map((product) => (
//               <CartItem key={product._id}>
//                 <Image src={product.image} alt={product.name} />
//                 <Details>
//                   <ProductName>{product.title}</ProductName>
//                   <OriginalPrice>Original Price: ${product.price.toFixed(2)}</OriginalPrice>
//                   <ProductPrice>
//                     Total: ${(product.price * product.quantity).toFixed(2)}
//                   </ProductPrice>
//                   <QuantityContainer>
//                     <QuantityButton onClick={() => handleDecrement(product._id)}>-</QuantityButton>
//                     <Quantity>{product.quantity}</Quantity>
//                     <QuantityButton onClick={() => handleIncrement(product._id)}>+</QuantityButton>
//                   </QuantityContainer>
//                 </Details>
//               </CartItem>
//             ))}
//           </CartItems>
//           <Summary>
//             <SummaryText>Total: ${cart.total.toFixed(2)}</SummaryText>
//             <CheckoutButton>Proceed to Checkout</CheckoutButton>
//           </Summary>
//         </>
//       ) : (
//         <EmptyCart>
//           <p>Your cart is currently empty.</p>
//           <Link to="/">Continue Shopping</Link>
//         </EmptyCart>
//       )}
//     </Container>
//   );
// };

// export default Cart;

// // Styles
// const Container = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const CartItems = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const CartItem = styled.div`
//   display: flex;
//   margin-bottom: 20px;
//   border: 1px solid #e0e0e0;
//   padding: 10px;
// `;

// const Image = styled.img`
//   width: 100px;
//   height: auto;
// `;

// const Details = styled.div`
//   margin-left: 20px;
// `;

// const ProductName = styled.h2`
//   font-size: 18px;
// `;

// const OriginalPrice = styled.p`
//   font-size: 14px;
//   color: #999;
// `;

// const ProductPrice = styled.p`
//   font-size: 16px;
//   font-weight: bold;
// `;

// const QuantityContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 10px;
// `;

// const Quantity = styled.span`
//   font-size: 16px;
//   margin: 0 10px;
// `;

// const QuantityButton = styled.button`
//   background-color: #333;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   font-size: 16px;
//   &:hover {
//     background-color: #555;
//   }
// `;

// const Summary = styled.div`
//   margin-top: 20px;
//   text-align: right;
// `;

// const SummaryText = styled.h2`
//   font-size: 24px;
//   font-weight: bold;
// `;

// const CheckoutButton = styled.button`
//   padding: 10px;
//   font-size: 18px;
//   background-color: #333;
//   color: white;
//   cursor: pointer;
//   margin-top: 10px;
// `;

// const EmptyCart = styled.div`
//   text-align: center;
//   p {
//     font-size: 20px;
//     margin-bottom: 10px;
//   }
// `;


