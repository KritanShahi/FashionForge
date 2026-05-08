import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f0f0f0;
  padding: 15px;
`;

const Wrapper = styled.div`
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

const Title = styled.h1`
  font-size: 22px;
  font-weight: 400;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    border-color: teal;
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;

  background-color: teal;
  color: white;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  font-size: 15px;

  transition: 0.3s;

  &:hover {
    background-color: #006d6d;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-align: center;
  font-size: 14px;
  color: teal;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const validateForm = () => {
    if (!username.trim()) {
      setValidationError("Username required");
      return false;
    }

    if (!email.trim()) {
      setValidationError("Email required");
      return false;
    }

    if (newPassword.length < 6) {
      setValidationError("Min 6 chars");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords mismatch");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setValidationError("");
    setServerError("");

    if (!validateForm()) return;

    try {
      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      setServerError("Something went wrong");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>

        <Form>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {validationError && <Error>{validationError}</Error>}
          {serverError && <Error>{serverError}</Error>}

          <Button onClick={handleClick}>SUBMIT</Button>

          <StyledLink to="/signup">Create new account</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgetPassword;
