
import React, { useState } from 'react';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px; /* Set a fixed width for better alignment */
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
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'user', // default to 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Form submitted:', formData);
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

        <FilterText>Choice:</FilterText>
        <Select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="" disabled>Select user type</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignupContainer>
  );
};

export default Signup;

