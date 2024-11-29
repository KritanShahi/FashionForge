import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: darkcyan;
  }
`;

const CloseButton = styled(Button)`
  background: red;
  &:hover {s
    background: darkred;
  }
`;

/*const BuyNow = ({ onClose, product, onOrderSuccess }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    contact: "",
    quantity: product._id === 'cart' ? cart.totalQuantity : 1, // Set default quantity
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to log in to place an order.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      products:
        product._id === 'cart'
          ? cart.products.map((cartProduct) => ({
              productId: cartProduct._id,
              quantity: cartProduct.quantity,
              price: cartProduct.price,
            }))
          : [
              {
                productId: product._id,
                quantity: orderDetails.quantity,
                price: product.price,
              },
            ],
      total: product._id === 'cart' ? cart.total : product.price * orderDetails.quantity,
      shippingAddress: orderDetails.address,
      contactNumber: orderDetails.contact,
      name: orderDetails.name,
    };

    try {
      await axios.post('http://localhost:8080/api/orders/buy', orderData);
      alert("Order placed successfully!");
      onOrderSuccess(); // Notify Cart component of successful order
      onClose(); // Close BuyNow modal
    } catch (error) {
      console.error("Failed to place order:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      <FormContainer>
        <Title>Buy Now</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={orderDetails.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={orderDetails.address}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={orderDetails.contact}
            onChange={handleChange}
            required
          />
          {product._id !== 'cart' && (
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={orderDetails.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          )}
          <Button type="submit">Place Order</Button>
        </form>
        <CloseButton onClick={onClose}>Cancel</CloseButton>
      </FormContainer>
    </Modal>
  );
};

export default BuyNow;*/
/*const BuyNow = ({ onClose, product, onOrderSuccess }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    contact: "",
    quantity: product._id === 'cart' ? cart.totalQuantity : 1, // Set default quantity
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to log in to place an order.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      products:
        product._id === 'cart'
          ? cart.products.map((cartProduct) => ({
              productId: cartProduct._id,
              quantity: cartProduct.quantity,
              price: cartProduct.price,
            }))
          : [
              {
                productId: product._id,
                quantity: orderDetails.quantity,
                price: product.price,
              },
            ],
      total: product._id === 'cart' ? cart.total : product.price * orderDetails.quantity,
      shippingAddress: orderDetails.address,
      contactNumber: orderDetails.contact,
      name: orderDetails.name,
    };

    try {
      await axios.post('http://localhost:8080/api/orders/buy', orderData);
      alert("Order placed successfully!");
      onOrderSuccess(); // Notify Cart component of successful order
      onClose(); // Close the modal
      navigate('/'); // Navigate to homepage
    } catch (error) {
      console.error("Failed to place order:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      <FormContainer>
        <Title>Buy Now</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={orderDetails.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={orderDetails.address}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={orderDetails.contact}
            onChange={handleChange}
            required
          />
          {product._id !== 'cart' && (
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={orderDetails.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          )}
          <Button type="submit">Place Order</Button>
        </form>
        <CloseButton onClick={onClose}>Cancel</CloseButton>
      </FormContainer>
    </Modal>
  );
};
export default BuyNow;*/

const BuyNow = ({ onClose, product, onOrderSuccess }) => {
  const user = useSelector((state) => state.user.currentUser); // Access the logged-in user
  const cart = useSelector((state) => state.cart); // Access cart details (for multiple products)

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    contact: "",
    quantity: product.quantity || 1, // Use the quantity passed or default to 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };
    // Determine whether it's a single product or cart purchase
    const isCartPurchase = product._id === "cart";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to log in to place an order.");
      return;
    }



    const orderData = {
      userId: user._id,
      products: isCartPurchase
        ? cart.products.map((cartProduct) => ({
            productId: cartProduct._id,
            quantity: cartProduct.quantity,
            price: cartProduct.price,
          }))
        : [
            {
              productId: product._id,
              quantity: orderDetails.quantity,
              price: product.price,
            },
          ],
      total: isCartPurchase
        ? cart.total
        : product.price * orderDetails.quantity,
      shippingAddress: orderDetails.address,
      contactNumber: orderDetails.contact,
      name: orderDetails.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/buy",
        orderData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Order placed successfully!");
        onOrderSuccess(); // Call the success handler (reset cart or close modal)
        onClose(); // Close the BuyNow modal
      } else {
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Order submission error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      <FormContainer>
        <Title>Buy Now</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={orderDetails.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={orderDetails.address}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={orderDetails.contact}
            onChange={handleChange}
            required
          />
          {!isCartPurchase && (
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={orderDetails.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          )}
          <Button type="submit">Place Order</Button>
          <CloseButton onClick={onClose}>Cancel</CloseButton>
        </form>
      </FormContainer>
    </Modal>
  );
};

export default BuyNow;
