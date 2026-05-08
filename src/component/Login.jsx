import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px; /* tighter card */
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

  @media (min-width: 768px) {
    padding: 30px;
    max-width: 380px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 300;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  display: block;

  &:focus {
    outline: none;
    border-color: teal;
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background-color: teal;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #007777;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const LinkText = styled(Link)`
  font-size: 14px;
  text-align: center;
  color: teal;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 13px;
  text-align: center;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.isAdmin ? "/admin" : "/");
    }
  }, [currentUser, navigate]);

  const validateForm = () => {
    if (!username.trim())
      return (setValidationError("Username is required."), false);
    if (username.length < 3)
      return (setValidationError("Min 3 characters required."), false);
    if (!password.trim())
      return (setValidationError("Password is required."), false);
    if (password.length < 6)
      return (setValidationError("Min 6 characters required."), false);

    setValidationError("");
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(dispatch, { username, password });
    } catch (err) {
      setValidationError("Login failed. Try again.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>

        <Form>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {validationError && <Error>{validationError}</Error>}
          {error && <Error>Invalid username or password</Error>}

          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>

          <LinkText to="/signup">Create new account</LinkText>
          <LinkText to="/forget">Forgot password?</LinkText>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
