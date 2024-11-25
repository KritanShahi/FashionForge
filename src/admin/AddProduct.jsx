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
  

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setNewProduct({ ...newProduct, image: reader.result });
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Post the new product to the backend
//     console.log("Product Added:", newProduct);
//     navigate("/admin/product"); // Navigate back after adding product
//   };
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
  };
  

  return (
    <Container>
      <h2>Add New Product</h2>
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

export default AddProduct;
