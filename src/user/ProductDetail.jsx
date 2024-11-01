// ProductDetail Component
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch ,useSelector} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import Navbar from '../component/Navbar';// Import Navbar component
import { Add, Remove } from '@mui/icons-material';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const quantitys = useSelector(state=>state.cart.quantity);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setRating(response.data.rating);
        setRatingCount(response.data.ratingCount);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

 /* const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
      navigate('/signup'); // Redirect to signup page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };*/

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout');
      navigate('/signup'); // Redirect to signup page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoveClick = async () => {
    try {
      await axios.post(`http://localhost:8080/api/products/${id}/love`);
      setRating((prevRating) => ((prevRating * ratingCount + 1) / (ratingCount + 1)).toFixed(1));
      setRatingCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error updating love count:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment) {
      try {
        const response = await axios.post(`http://localhost:8080/api/products/${id}/comments`, {
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

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity: parseInt(quantity) }));
    alert("Product added to cart");
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Navbar  
  handleLogout={handleLogout}
  quantity={quantitys} /> {/* Navbar Component */}
      <Content>
        <Image src={product.image} alt={product.name} />
        <Details>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>{product.price}</ProductPrice>

          <Rating>
            <span>Rating: {rating} ({ratingCount} votes)</span>
            <Stars>{'★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '')}</Stars>
            <LoveButton onClick={handleLoveClick}>
              <StarBorderIcon />
            </LoveButton>
          </Rating>

          <AmountContainer>
            <label>Quantity:</label>
            <Remove onClick={() => handleQuantity("dec")} />
            <Amount>{quantity}</Amount>
            <Add onClick={() => handleQuantity("inc")} />
          </AmountContainer>

          <ButtonGroup>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            <BuyNowButton>Buy Now</BuyNowButton>
          </ButtonGroup>

          <CommentsSection>
            <h3>Customer Reviews</h3>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <CommentUser>{comment.user}</CommentUser>
                <CommentText>{comment.text}</CommentText>
              </Comment>
            ))}

            <AddComment>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <CommentButton onClick={handleAddComment}>Submit</CommentButton>
            </AddComment>
          </CommentsSection>
        </Details>
      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding-top: 0px; /* Adjusted padding for fixed Navbar */
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  padding: 20px;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  margin-left: 20px;
  flex: 1;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;


const ProductDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
`;

const Rating = styled.div`
  font-size: 1rem;
  color: #888;
  margin-bottom: 10px;
`;

const Stars = styled.span`
  font-size: 1.5rem;
  color: #ffdd00;
  margin-right: 10px;
`;

const LoveButton = styled.button`
  font-size: 1.5rem;
  color: #ff4d4d;
  background: none;
  border: none;
  cursor: pointer;
`;

const QuantitySelector = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  
  label {
    margin-right: 10px;
  }
  
  input {
    width: 50px;
    padding: 5px;
  }
`;
const AmountContainer=styled.div`
display:flex;
align-items:center;
`

const Amount=styled.span`
width:30px;
height:30px;
border-radius:10px;
border:1px solid teal;
display:flex;
align-items:center;
justify-content:center;
margin:0px 5px;
`


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
  border-radius: 5px;
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
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e63e00;
  }
`;

const CommentsSection = styled.div`
  margin-top: 30px;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const CommentUser = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const CommentText = styled.span`
  color: #666;
`;

const AddComment = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  
  input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export default ProductDetail;

