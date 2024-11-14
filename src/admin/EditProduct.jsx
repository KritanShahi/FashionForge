import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = location.state || {};
  const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' });

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:8080/api/products/${productId}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/products/${productId}`, product)
      .then(response => {
        navigate('/admin/product'); // Navigate back to the ManageProducts page after saving
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleCancel = () => {
    navigate('/admin/product'); // Navigate back to the ManageProducts page when canceled
  };

  return (
    <Container>
      <h2>Edit Product</h2>
      <Form>
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="price"
          placeholder="Product Price"
          value={product.price}
          onChange={handleInputChange}
        />
        <Input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form>
    </Container>
  );
};

// Styled-components for styling
const Container = styled.div`
  padding: 20px;
`;

const Form = styled.div`
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

export default EditProduct;
