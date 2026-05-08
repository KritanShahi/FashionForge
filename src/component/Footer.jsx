import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const Footer = () => {
  return (
    <FooterWrapper>

      <Newsletter>
        <NLText>
          <h3>Stay in style</h3>
          <p>New drops, exclusive deals — straight to your inbox.</p>
        </NLText>
        <NLForm>
          <NLInput type="email" placeholder="your@email.com" />
          <NLButton>Subscribe</NLButton>
        </NLForm>
      </Newsletter>

      <TopGrid>
        <Brand>
          <Logo>Fashion<span>Forge</span></Logo>
          <Desc>Curated fashion for every style. Quality pieces, delivered fast.</Desc>
          <Socials>
            <SocialBtn href="#"><InstagramIcon fontSize="small" /></SocialBtn>
            <SocialBtn href="#"><FacebookIcon fontSize="small" /></SocialBtn>
            <SocialBtn href="#"><TwitterIcon fontSize="small" /></SocialBtn>
          </Socials>
        </Brand>

        <Col>
          <ColTitle>Shop</ColTitle>
          <LinkList>
            <li><StyledLink to="#">New arrivals</StyledLink></li>
            <li><StyledLink to="#">Men's collection</StyledLink></li>
            <li><StyledLink to="#">Women's collection</StyledLink></li>
            <li><StyledLink to="#">Accessories</StyledLink></li>
            <li><StyledLink to="#">Sale</StyledLink></li>
          </LinkList>
        </Col>

        <Col>
          <ColTitle>Account</ColTitle>
          <LinkList>
            <li><StyledLink to="/orderdetails">My orders</StyledLink></li>
            <li><StyledLink to="/cart">My cart</StyledLink></li>
            <li><StyledLink to="/login">Login</StyledLink></li>
            <li><StyledLink to="/register">Register</StyledLink></li>
          </LinkList>
        </Col>

        <Col>
          <ColTitle>Help</ColTitle>
          <LinkList>
            <li><StyledLink to="#">FAQ</StyledLink></li>
            <li><StyledLink to="#">Shipping & returns</StyledLink></li>
            <li><StyledLink to="#">Size guide</StyledLink></li>
            <li><StyledLink to="#">Contact us</StyledLink></li>
            <li><StyledLink to="#">Privacy policy</StyledLink></li>
          </LinkList>
        </Col>
      </TopGrid>

      <Divider />

      <Bottom>
        <Copy>© 2026 <GoldSpan>Fashion Forge</GoldSpan> | Built by Kritan Shahi</Copy>
        <Badges>
          <Badge><LockOutlinedIcon style={{ fontSize: 14 }} /> Secure checkout</Badge>
          <Badge><LocalShippingOutlinedIcon style={{ fontSize: 14 }} /> Fast delivery</Badge>
          <Badge><ReplayOutlinedIcon style={{ fontSize: 14 }} /> Easy returns</Badge>
        </Badges>
      </Bottom>

    </FooterWrapper>
  );
};

export default Footer;



const FooterWrapper = styled.footer`
  background: #111;
  color: #ccc;
  font-family: 'DM Sans', sans-serif;
  border-top: 2px solid #c9a84c;
  padding: 48px 32px 24px;

  @media (max-width: 480px) {
    padding: 32px 20px 20px;
  }
`;

const Newsletter = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const NLText = styled.div`
  h3 { font-size: 15px; font-weight: 500; color: #fff; margin-bottom: 4px; }
  p  { font-size: 12px; color: #666; }
`;

const NLForm = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  max-width: 360px;

  @media (max-width: 640px) { max-width: 100%; width: 100%; }
`;

const NLInput = styled.input`
  flex: 1;
  height: 38px;
  padding: 0 14px;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  outline: none;

  &::placeholder { color: #444; }
  &:focus { border-color: #c9a84c; }
`;

const NLButton = styled.button`
  height: 38px;
  padding: 0 18px;
  background: #c9a84c;
  border: none;
  border-radius: 8px;
  color: #111;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover { background: #f0d080; }
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) { grid-template-columns: 1fr 1fr; gap: 28px; }
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`;

const Brand = styled.div``;

const Logo = styled.h2`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  letter-spacing: 3px;
  color: #f0d080;
  margin-bottom: 12px;
  span { color: #fff; }
`;

const Desc = styled.p`
  font-size: 13px;
  color: #888;
  line-height: 1.7;
  margin-bottom: 20px;
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialBtn = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;

  &:hover { border-color: #c9a84c; color: #f0d080; }
`;

const Col = styled.div``;

const ColTitle = styled.p`
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #f0d080;
  font-weight: 500;
  margin-bottom: 16px;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: #888;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;

  &:hover { color: #f0d080; }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #222;
  margin-bottom: 24px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 640px) { flex-direction: column; align-items: flex-start; }
`;

const Copy = styled.p`
  font-size: 12px;
  color: #555;
`;

const GoldSpan = styled.span`
  color: #c9a84c;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;

  svg { color: #c9a84c; }
`;