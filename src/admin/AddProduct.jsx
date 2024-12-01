import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const AddProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, or GIF).");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  

  const validateForm = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
      setError("Please fill in all fields and upload an image.");
      return false;
    }

    // Validate product name to ensure it's not a number
    if (!isNaN(newProduct.name)) {
      setError("Product name cannot be a number.");
      return false;
    }

    // Validate price to ensure it's a valid number
    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      setError("Please enter a valid price.");
      return false;
    }

    setError(""); // Clear any previous error messages
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    // Post the new product to the backend
    axios
      .post('http://localhost:8080/api/products', newProduct)
      .then((response) => {
        console.log('Product added:', response.data);

        // Redirect back to ManageProducts after adding
        navigate('/admin/product', { state: { refresh: true } });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };
/*
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Post the new product to the backend
    axios
      .post('http://localhost:8080/api/products', newProduct)
      .then((response) => {
        console.log('Product added:', response.data);
  
        // Redirect back to ManageProducts after adding
        navigate('/admin/product', { state: { refresh: true } });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };*/
    const handleCancel = () => {
    navigate('/admin/product'); // Navigate back to the ManageProducts page when canceled
  };

  return (
    <Container>
      <h2>Add New Product</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        {/* <Input type="file" name="image" onChange={handleImageChange} /> */}
        <Input 
  type="file" 
  name="image" 
  accept="image/*" 
  onChange={handleImageChange} 
/>
        <Button type="submit">Add Product</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form>
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
export default AddProduct;
