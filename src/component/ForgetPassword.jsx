/*import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    if (!username.trim()) {
      setValidationError("Username is required.");
      return false;
    }
    if (!email.trim()) {
      setValidationError("Email is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    setValidationError(""); // Clear validation errors
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Password reset successfully.');
      } else {
        alert(result.message || 'Failed to reset password.');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      alert('An error occurred while resetting the password.');
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form>
          <Input 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input 
            placeholder="New Password" 
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <Input 
            placeholder="Confirm Password" 
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {validationError && <Error>{validationError}</Error>}
          <Button onClick={handleClick}>SUBMIT</Button>
          <Link to='/signup'>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgetPassword;*///after successfully reset password navigate to login page
/*
function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const validateForm = () => {
    if (!username.trim()) {
      setValidationError("Username is required.");
      return false;
    }
    if (!email.trim()) {
      setValidationError("Email is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    setValidationError(""); // Clear validation errors
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Password reset successfully.');
        navigate('/login'); // Navigate to the login page after success
      } else {
        // Handle specific error message from server
        if (result.message.includes("not registered")) {
          setServerError("Username or email you have entered is not registered.");
        } else {
          setServerError(result.message || "Failed to reset password.");
        }
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setServerError("An error occurred while resetting the password.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="New Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {validationError && <Error>{validationError}</Error>}
          {serverError && <Error>{serverError}</Error>}
          <Button onClick={handleClick}>SUBMIT</Button>
          <Link to='/signup'>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgetPassword;
*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
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
      setValidationError("Username is required.");
      return false;
    }
    if (!email.trim()) {
      setValidationError("Email is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
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
      const response = await axios.post('http://localhost:8080/api/forget-password', {
        username,
        email,
        newPassword,
      });
  
      alert('Password reset successfully.');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response);
        setServerError(err.response.data.message || "An error occurred.");
      } else if (err.request) {
        console.error('Error request:', err.request);
        setServerError("No response from server. Please try again later.");
      } else {
        console.error('Error:', err.message);
        setServerError("An unexpected error occurred.");
      }
    }
  };
  
  
  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            placeholder="New Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {validationError && <Error>{validationError}</Error>}
          {serverError && <Error>{serverError}</Error>}
          <Button onClick={handleClick}>SUBMIT</Button>
          <Link to="/signup">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgetPassword;

