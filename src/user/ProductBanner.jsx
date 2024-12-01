import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProductBanner = ({ productImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [productImages]);

  if (productImages.length === 0) {
    return null; // Render nothing if there are no images
  }

  return (
    <BannerContainer>
      <Image src={productImages[currentIndex]} alt={`Product ${currentIndex + 1}`} />
      <DotsContainer>
        {productImages.map((_, index) => (
          <Dot
            key={index}
            isActive={index === currentIndex}
            onClick={() => setCurrentIndex(index)} // Allow clicking on dots to navigate
          />
        ))}
      </DotsContainer>
    </BannerContainer>
  );
};

// Styled Components
const BannerContainer = styled.div`
  width: 100%;
  height: 400px; /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.5s ease-in-out;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#333' : '#ddd')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.isActive ? '#555' : '#bbb')};
  }
`;

export default ProductBanner;
