import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f0f0f0;
  padding: 15px;

  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  max-width: 380px;

  background: white;
  padding: 20px;

  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 12px;

  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;

  border: 1px solid #ccc;
  border-radius: 6px;

  font-size: 14px;

  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;

  border: 1px solid #ccc;
  border-radius: 6px;

  font-size: 14px;

  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;

  background-color: #007bff;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;

const LoginLink = styled(Link)`
  text-align: center;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "isAdmin" ? value === "true" : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        formData,
      );
      navigate(formData.isAdmin ? "/admin" : "/");
    } catch (err) {
      setApiError("Signup failed");
    }
  };

  return (
    <SignupContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Sign Up</Title>

        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <ErrorText>{errors.username}</ErrorText>}

        <Select name="isAdmin" onChange={handleChange}>
          <option value="">Select user type</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </Select>

        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}

        <Button type="submit">Sign Up</Button>

        {apiError && <ErrorText>{apiError}</ErrorText>}

        <LoginLink to="/login">Already have an account?</LoginLink>
      </Form>
    </SignupContainer>
  );
};

export default Signup;
