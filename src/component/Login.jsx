import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0; // Match background color
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





function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Ensure this useEffect runs after the state update in Redux
  useEffect(() => {
    if (currentUser) {
      // Check if the user is an admin and navigate accordingly
      if (currentUser.isAdmin) {
        console.log("Navigating to /admin", currentUser.isAdmin);
        navigate('/admin');
      } else {
        console.log("Navigating to /", currentUser.isAdmin);
        navigate('/');
      }
    }
  }, [currentUser, navigate]); // Trigger this effect when currentUser state changes

  // Log to track currentUser state
  console.log(currentUser ? currentUser.isAdmin : "currentUser is null");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
    } catch (err) {
      console.error("Login error:", err); // Logs any potential errors in login API call
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input 
            placeholder="username" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
          <Input 
            placeholder="password" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && <Error>Something went wrong...</Error>}
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          <Link to='/signup'>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;







/*
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role after successful login
    if (currentUser) {
      if (currentUser.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [currentUser, navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    try {
      login(dispatch, { username, password });
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input 
            placeholder="username" 
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            placeholder="password" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>Something went wrong...</Error>}
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          <Link to='/signup'>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login; */
