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
/*
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.quantity);
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

  const handleLogout = () => {
   
    dispatch(logout()); 
    navigate('/login');// Clear user state
  };

  const handleLoveClick = async () => {
    try {
      await axios.post(`http://localhost:8080/api/products/${id}/love`);
      // setRating((prevRating * ratingCount + 1) / (ratingCount + 1));
      setRating((prevRating) => ((prevRating * ratingCount + 1) / (ratingCount + 1)));
      setRatingCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error updating love count:', error);
    }
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
            <Image src={product.image} alt={product.name} />
            <Details>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>${product.price}</ProductPrice>

              <Rating>
                <span>Rating: {rating.toFixed(1)} ({ratingCount} votes)</span>
                <Stars>{'★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '')}</Stars>
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
                <BuyNowButton>Buy Now</BuyNowButton>
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
};*/ 

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setRating(response.data.rating || 0);
        setRatingCount(response.data.ratingCount || 0);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleLoveClick = async () => {
    try {
      await axios.post(`http://localhost:8080/api/products/${id}/love`);
      const newRating = (rating * ratingCount + 1) / (ratingCount + 1); 
      setRating(newRating);
      setRatingCount(ratingCount + 1); 
    } catch (error) {
      console.error('Error updating love count:', error);
    }
  };

  const renderStars = () => {
    const fullStars = Array(Math.floor(rating)).fill(<StarIcon key="full" />);
    const halfStar = rating % 1 ? [<StarBorderPurple500Icon key="half" />] : [];
    return [...fullStars, ...halfStar];
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
            <Image src={product.image} alt={product.name} />
            <Details>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>${product.price}</ProductPrice>

              <Rating>
                <span>Rating: {rating.toFixed(1)} ({ratingCount} votes)</span>
                <Stars>{renderStars()}</Stars> {/* Dynamically render stars */}
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
                <BuyNowButton>Buy Now</BuyNowButton>
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

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled, { createGlobalStyle } from 'styled-components';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct } from '../redux/cartRedux';
// import Navbar from '../component/Navbar';
// import { Add, Remove } from '@mui/icons-material';
// import CustomerReview from './CustomerReview';

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
//   body, html, #root {
//     height: 100%;
//   }
// `;

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const quantitys = useSelector(state => state.cart.quantity);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/products/${id}`);
//         setProduct(response.data);
//         setRating(response.data.rating);
//         setRatingCount(response.data.ratingCount);
//         setComments(response.data.comments);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };
//     fetchProduct();
    
 
//   }, [id]);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:8080/api/logout');
//       navigate('/signup');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleLoveClick = async () => {
//     try {
//       await axios.post(`http://localhost:8080/api/products/${id}/love`);
//       setRating((prevRating) => ((prevRating * ratingCount + 1) / (ratingCount + 1)).toFixed(1));
//       setRatingCount((prevCount) => prevCount + 1);
//     } catch (error) {
//       console.error('Error updating love count:', error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (newComment) {
//       try {
//         const response = await axios.post(`http://localhost:8080/api/products/${id}/comments`, {
//           user: 'You',
//           text: newComment,
//         });
//         setComments(response.data);
//         setNewComment('');
//       } catch (error) {
//         console.error('Error adding comment:', error);
//       }
//     }
//   };
  

//   const handleEditComment = async (commentId, updatedText) => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/products/${id}/comments/${commentId}`, {
//         text: updatedText, // Send the updated text
//       });
  
//       // Update the comments state after successful edit
//       setComments((prevComments) => 
//         prevComments.map(comment => 
//           comment._id === commentId ? { ...comment, text: updatedText } : comment // Update only the edited comment
//         )
//       );
//     } catch (error) {
//       console.error('Error editing comment:', error);
//     }
//   };
  
  

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/products/${id}/comments/${commentId}`);
//       const response = await axios.get(`http://localhost:8080/api/products/${id}`);
//       setComments(response.data.comments);  // Re-fetch the updated comments
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };
  
  
  
//   const handleAddToCart = () => {
//     dispatch(addProduct({ ...product, quantity: parseInt(quantity) }));
//     alert("Product added to cart");
//   };

//   const handleQuantity = (type) => {
//     if (type === "dec") {
//       quantity > 1 && setQuantity(quantity - 1);
//     } else {
//       setQuantity(quantity + 1);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <>
//       <GlobalStyle />
//       <Container>
//         <Navbar handleLogout={handleLogout} quantity={quantitys} />
//         <CenteredContainer>
//           <Content>
//             <Image src={product.image} alt={product.name} />
//             <Details>
//               <ProductName>{product.name}</ProductName>
//               <ProductDescription>{product.description}</ProductDescription>
//               <ProductPrice>{product.price}</ProductPrice>

//               <Rating>
//                 <span>Rating: {rating} ({ratingCount} votes)</span>
//                 <Stars>{'★'.repeat(Math.floor(rating)) + (rating % 1 ? '☆' : '')}</Stars>
//                 <LoveButton onClick={handleLoveClick}>
//                   <StarBorderIcon />
//                 </LoveButton>
//               </Rating>

//               <AmountContainer>
//                 <label>Quantity:</label>
//                 <Remove onClick={() => handleQuantity("dec")} />
//                 <Amount>{quantity}</Amount>
//                 <Add onClick={() => handleQuantity("inc")} />
//               </AmountContainer>

//               <ButtonGroup>
//                 <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
//                 <BuyNowButton>Buy Now</BuyNowButton>
//               </ButtonGroup>
//             </Details>
//           </Content>
// </CenteredContainer>
//           <CustomerReview 
//             comments={comments} 
//             newComment={newComment} 
//             setNewComment={setNewComment} 
//             handleAddComment={handleAddComment} 
//             handleEditComment={handleEditComment} // New prop for handling edits
//             handleDeleteComment={handleDeleteComment} 
//           />
    
//     </Container>
//     </>
//   );
// ;

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   width: 100%;
//   padding-top: 0;
// `;



// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;

// const Content = styled.div`
//   display: flex;
//   padding: 20px;
//   gap: 20px;
//   max-width: 800px;
//   width: 100%;
// `;

// const Image = styled.img`
//   width: 400px;
//   height: auto;
//   object-fit: cover;
//   border-radius: 10px;
// `;

// const Details = styled.div`
//   flex: 1;
//   max-width: 600px;
// `;

// const ProductName = styled.h1`
//   font-size: 2rem;
//   margin-bottom: 10px;
// `;

// const ProductDescription = styled.p`
//   font-size: 1.2rem;
//   color: #666;
// `;

// const ProductPrice = styled.p`
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin: 20px 0;
// `;

// const Rating = styled.div`
//   font-size: 1rem;
//   color: #888;
//   margin-bottom: 10px;
// `;

// const Stars = styled.span`
//   font-size: 1.5rem;
//   color: #ffdd00;
//   margin-right: 10px;
// `;

// const LoveButton = styled.button`
//   font-size: 1.5rem;
//   color: #ff4d4d;
//   background: none;
//   border: none;
//   cursor: pointer;
// `;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
// `;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-top: 20px;
// `;

// const AddToCartButton = styled.button`
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const BuyNowButton = styled.button`
//   padding: 10px 20px;
//   background-color: #ff5733;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #e63e00;
//   }
// `;

// export default ProductDetail;




/*   <CustomerReview comments={comments} onAddComment={handleAddComment} />*/

    // <CommentsSection>
    //         <h3>Customer Reviews</h3>
    //         {comments.map((comment) => (
    //           <Comment key={comment.id}>
    //             <comments>{comment.user}</comments>
    //             <CommentText>{comment.text}</CommentText>
    //           </Comment>
    //         ))}

    //         <comments>
    //           <input
    //             type="text"
    //             placeholder="Add a comment..."
    //             value={newComment}
    //             onChange={(e) => setNewComment(e.target.value)}
    //           />
    //           <CommentButton onClick={handleAddComment}>Submit</CommentButton>
    //         </comments>
    //       </CommentsSection>}}}}}}
