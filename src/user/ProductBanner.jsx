import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProductBanner = ({ productImages, maxItems = 5 }) => {
  const images = productImages.slice(0, maxItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((i) => (i + 1) % images.length);

  return (
    <BannerContainer>
      <ArrowBtn left onClick={prev}>
        &#8249;
      </ArrowBtn>

      <Image src={images[currentIndex]} alt={`Product ${currentIndex + 1}`} />

      <ArrowBtn onClick={next}>&#8250;</ArrowBtn>

      <DotsContainer>
        {images.map((_, i) => (
          <Dot
            key={i}
            $isActive={i === currentIndex}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </DotsContainer>
    </BannerContainer>
  );
};

export default ProductBanner;

const BannerContainer = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: opacity 0.4s ease;
`;

const ArrowBtn = styled.button`
  position: absolute;
  ${({ left }) => (left ? "left: 12px" : "right: 12px")};
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 14px;
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: ${({ $isActive }) => ($isActive ? "24px" : "10px")};
  height: 10px;
  border-radius: 999px;
  background: ${({ $isActive }) => ($isActive ? "#333" : "#ccc")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? "#555" : "#aaa")};
  }
`;
