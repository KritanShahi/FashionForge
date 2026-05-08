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

/* ================= GLOBAL ================= */

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
`;

/* ================= COMPONENT ================= */

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);

  const cartQuantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(res.data);
        setRating(res.data.rating || 0);
        setRatingCount(res.data.ratingCount || 0);

        if (user && res.data.ratedUsers?.includes(user._id)) {
          setUserHasRated(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity }));
    alert("Added to cart");
  };

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  if (!product) return <Loading>Loading...</Loading>;

  return (
    <>
      <GlobalStyle />
      <Container>

        <Navbar handleLogout={handleLogout} quantity={cartQuantity} />

        <Wrapper>

          <ImageContainer>
            <Image src={product.image} alt={product.name} />
          </ImageContainer>

          <InfoContainer>

            <Title>{product.name}</Title>
            <Desc>{product.description}</Desc>
            <Price>Rs {product.price}</Price>

            <RatingBox>
              <span>Rating: {rating.toFixed(1)} ({ratingCount})</span>

              <Stars>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    style={{
                      color: i < Math.round(rating) ? "#FFD700" : "#ddd"
                    }}
                  />
                ))}
              </Stars>

              <LoveButton>
                <StarBorderIcon />
              </LoveButton>
            </RatingBox>

            <QuantityBox>
              <Remove onClick={() => handleQuantity('dec')} />
              <Qty>{quantity}</Qty>
              <Add onClick={() => handleQuantity('inc')} />
            </QuantityBox>

            <ButtonRow>
              <CartBtn onClick={handleAddToCart}>Add to Cart</CartBtn>
              <BuyBtn onClick={() => setIsOrderFormOpen(true)}>Buy Now</BuyBtn>
            </ButtonRow>

          </InfoContainer>
        </Wrapper>

        <CustomerReview
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
        />

        {isOrderFormOpen && (
          <BuyNow
            onClose={() => setIsOrderFormOpen(false)}
            product={{ ...product, quantity }}
          />
        )}

      </Container>
    </>
  );
};

export default ProductDetail;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 30px;
    gap: 40px;
    max-width: 1100px;
    margin: auto;
  }
`;


const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 10px;
  object-fit: contain;

  @media (min-width: 768px) {
    max-width: 450px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Desc = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;



const RatingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Stars = styled.div`
  display: flex;
`;

const LoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: red;
`;


const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Qty = styled.span`
  width: 35px;
  height: 35px;
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CartBtn = styled.button`
  padding: 10px;
  background: green;
  color: white;
  border: none;
  cursor: pointer;
`;

const BuyBtn = styled.button`
  padding: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
`;


const Loading = styled.div`
  padding: 20px;
  text-align: center;
`;