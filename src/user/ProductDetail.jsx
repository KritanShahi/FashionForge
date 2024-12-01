import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import Navbar from '../component/Navbar';
import { Add, Remove } from '@mui/icons-material';
import CustomerReview from './CustomerReview';
import BuyNow from '../component/BuyNow';
import { logout } from "../redux/userRedux";
import StarIcon from '@mui/icons-material/Star';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html, #root {
    height: 100%;
  }
`;



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [ratingCount, setRatingCount] = useState(0); // Initial count is 0
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false); // User rating state
  const user = useSelector((state) => state.user.currentUser); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setRating(response.data.rating || 0);
        setRatingCount(response.data.ratingCount || 0);

        // Check if the user has already rated
        if (user && response.data.ratedUsers?.includes(user._id)) {
          setUserHasRated(true);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id, user]);
  



  const handleBuyNowClick = () => {
    setIsOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setIsOrderFormOpen(false);
  };

  const handleOrderSubmit = (orderData) => {
    console.log("Order Submitted:", orderData);
    // You can send the order data to your backend here.
  };



  const handleLoveClick = async () => {
    if (!user) {
      alert("You need to log in to rate this product.");
      return;
    }

    // Check if the user has already rated
    if (userHasRated) {
      alert("You have already rated this product.");
      return;
    }

    try {
      // Send the rating request to the backend
      const response = await axios.post(`http://localhost:8080/api/products/${id}/rate`, {
        userId: user._id,
        rating: 1, // This is a placeholder for the rating. You can modify based on your requirement (e.g., increment by 1)
      });

      if (response.status === 200) {
        // Update the rating and count based on the response
        setRating(response.data.newRating);
        setRatingCount(response.data.newRatingCount);

        // Mark the user as having rated
        setUserHasRated(true);

        alert("Thank you for your rating!");
      }
    } catch (error) {
      // Handle any errors from the backend
      alert(error.response?.data?.message || "An error occurred while submitting your rating.");
    }
  };






  const handleLogout = () => {
   
    dispatch(logout()); 
    navigate('/login');// Clear user state
  };



  const handleAddComment = async () => {
    if (newComment) {
      try {
        const response = await axios.post(`http://localhost:8080/api/comment/${id}/comments`, {
          user: 'You',
          text: newComment,
        });
        setComments(response.data);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditComment = async (commentId, updatedText) => {
    try {

      await axios.put(`http://localhost:8080/api/comment/${id}/comments/${commentId}`, {

        text: updatedText,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, text: updatedText } : comment
        )
      );
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {

      await axios.delete(`http://localhost:8080/api/comment/${id}/comments/${commentId}`);

      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity: parseInt(quantity) }));
    alert('Product added to cart');
  };

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };



  if (!product) return <div>Loading...</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar handleLogout={handleLogout} quantity={cartQuantity} />
        <CenteredContainer>
          <Content>
            <Image src={product.image} alt={product.namse} />
            <Details>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>Rs {product.price}</ProductPrice>

              <Rating>
                <span>Rating: {rating.toFixed(1)} ({ratingCount} votes)</span>
                <Stars>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      style={{
                        color: i < Math.round(rating) ? "#FFD700" : "#e0e0e0",
                      }} 
                    />
                  ))}
                </Stars>

                <LoveButton onClick={handleLoveClick}>
                  <StarBorderIcon />
                </LoveButton>
              </Rating>

              <AmountContainer>
                <label>Quantity:</label>
                <Remove onClick={() => handleQuantity('dec')} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity('inc')} />
              </AmountContainer>

              <ButtonGroup>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                <BuyNowButton onClick={handleBuyNowClick}>Buy Now</BuyNowButton>

                {isOrderFormOpen && (
        <BuyNow
          onClose={handleCloseOrderForm}
          onSubmit={handleOrderSubmit}
          product={{ ...product, quantity: quantity }} 
          onOrderSuccess={() => {
            alert("Order placed successfully!");
            navigate("/"); // Redirect to the homepage
          }}
        />
      )}
              </ButtonGroup>
            </Details>
          </Content>
        </CenteredContainer>
        <CustomerReview
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      </Container>
    </>
  );
};

//             <Stars>{'★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '')}</Stars>


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  flex: 1;
  max-width: 600px;
`;

const ProductName = styled.h1`
  font-size: 2rem;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Rating = styled.div`
  margin: 10px 0;
`;

const Stars = styled.span`
  font-size: 1.5rem;
  color: #ffdd00;
  margin-right: 10px;
`;

const LoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #ff4d4d;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const BuyNowButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5733;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e63e00;
  }
`;

export default ProductDetail;


//             <Stars>{'★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '')}</Stars>


/*
  const renderStars = () => {
    const fullStars = Array(Math.floor(rating)).fill(<StarIcon key="full" />);
    const halfStar = rating % 1 ? [<StarBorderPurple500Icon key="half" />] : [];
    return [...fullStars, ...halfStar];
  };
*/

/*
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setRating(response.data.rating || 0);
        setRatingCount(response.data.ratingCount || 0);

        // Check if the user has already rated
        if (user && response.data.ratedUsers?.includes(user._id)) {
          setUserHasRated(true);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id, user]);*/
