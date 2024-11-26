import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';

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
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { isFetching, error, currentUser } = useSelector((state) => state.user);
 

  const validateForm = () => {
    if (!username.trim()) {
      setValidationError("Username is required.");
      return false;
    }
    if (username.length < 3) {
      setValidationError("Username must be at least 3 characters long.");
      return false;
    }
    if (username.length > 20) {
      setValidationError("Username must be no longer than 20 characters.");
      return false;
    }  
    if (!password.trim()) {
      setValidationError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return false;
    }
    setValidationError(""); // Clear validation errors
    return true;
  };

  const handleClick=()=>{
    console.log('hlo');
  }

  /*
  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    try {
      await login(dispatch, { username, password });
    } catch (err) {
      console.error("ForgetPassword error:", err);
    }

  };*/

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
          name="email"
          placeholder="Email"
    
          required
        />
       
          <Input 
            placeholder="New Password" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
             <Input 
            placeholder="Confirm Password" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button onClick={handleClick} disabled={isFetching}>SUBMIT</Button>
          <Link to='/signup'>CREATE A NEW ACCOUNT</Link>

        </Form>
      </Wrapper>
    </Container>
  );
}

export default ForgetPassword;