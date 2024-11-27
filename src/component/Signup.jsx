import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  width:100vw;
`;

const Form = styled.form`
  background: white;
  padding: 5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 360px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  width: 26vw;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false, // default to 'user'
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isAdmin' ? value === 'true' : value, // Convert isAdmin to boolean
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3 || formData.username.length > 15) {
      newErrors.username = 'Username must be between 3 and 15 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.isAdmin === '') {
      newErrors.isAdmin = 'Please select a user type.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/signup', formData);
      console.log('Registration successful:', response.data);

      if (formData.isAdmin) {
        navigate('/admin'); // Redirect to admin home page
      } else {
        navigate('/'); // Redirect to user home page
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setApiError('Registration failed. Please try again.');
    }
  };

  return (
    <SignupContainer>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}

        <Select
          name="isAdmin"
          value={formData.isAdmin}
          onChange={handleChange}
        >
          <option value="" disabled>Select user type</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </Select>
        {errors.isAdmin && <ErrorText>{errors.isAdmin}</ErrorText>}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}

        <Button type="submit">Sign Up</Button>
        {apiError && <ErrorText>{apiError}</ErrorText>}
        <Link to='/login'>Already have an Account</Link>
      </Form>
    </SignupContainer>
  );
};

export default Signup;