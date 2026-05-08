import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import ChatBot from "../component/ChatBot";
import Navbar from "../component/Navbar";
import { logout } from "../redux/userRedux";
import ProductBanner from "./ProductBanner";
import Footer from "../component/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`,
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const productImages = products.map((p) => p.image);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <GlobalStyle />

      <Container>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleLogout={handleLogout}
          quantity={quantity}
        />

        <Main>
          <Banner>
            <BannerText>
              🚚 Free Shipping on orders above Rs 500! Limited time only. 🚚
            </BannerText>
          </Banner>

          <ProductBanner productImages={productImages} />

          <PageTitle>Our Products</PageTitle>

          <ProductGrid>
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard>
                  <ProductImage src={product.image} />

                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>
                      {product.description}
                    </ProductDescription>
                    <ProductPrice>Rs {product.price}</ProductPrice>

                    <StyledRating
                      value={product.rating || 4}
                      precision={0.5}
                      readOnly
                    />
                  </ProductInfo>
                </ProductCard>
              </Link>
            ))}
          </ProductGrid>

          <ChatBot />
        </Main>

        <Footer />
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Banner = styled.div`
  background: #ffc107;
  padding: 8px 0;
  overflow: hidden;
`;

const BannerText = styled.div`
  white-space: nowrap;
  font-weight: bold;
  animation: ${scroll} 12s linear infinite;
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 15px 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  width: 100%;
  padding: 10px;
`;

const ProductCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

const StyledRating = styled(Rating)`
  margin-top: 8px;
`;

export default Home;
