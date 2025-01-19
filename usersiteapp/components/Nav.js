import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import BarsIcon from '../components/icons/Bars';
import Cookies from 'js-cookie'; // cookies

const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.a`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  text-decoration: none;
  letter-spacing: 1px;
  font-family: 'Merriweather', serif;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 768px) {
    display: ${({ mobileNavActive }) => (mobileNavActive ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 50px 20px 20px;
    z-index: 999;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;

  &:hover {
    color: #0070f3;
  }
`;

const CartLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -12px;
  right: -18px;
  background-color: #0070f3;
  color: white;
  font-size: 0.8rem;
  padding: 3px 9px;
  border-radius: 50%;
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: #333;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function NavBar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cartData = Cookies.get('cart');
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      setCartItemCount(cartItems.length);
    }

    const userToken =  Cookies.get('token');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    window.location.href = '/'; 
  };

  return (
    <StyledHeader>
      <Wrapper>
        <Link href="/" passHref>
          <Logo>E-Biblioteka</Logo>
        </Link>
        <StyledNav mobileNavActive={mobileNavActive}>
          <Link href="/" passHref>
            <NavLink>Główna</NavLink>
          </Link>
          <Link href="/products" passHref>
            <NavLink>Sklep</NavLink>
          </Link>
          <CartLinkWrapper>
            <Link href="/cart" passHref>
              <NavLink>Koszyk</NavLink>
            </Link>
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartLinkWrapper>
          {isLoggedIn ? (
            <NavLink as="button" onClick={handleLogout}>
              Wyloguj się
            </NavLink>
          ) : (
            <Link href="/login" passHref>
              <NavLink>Zaloguj się</NavLink>
            </Link>
          )}
        </StyledNav>
        <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
          <BarsIcon />
        </NavButton>
      </Wrapper>
    </StyledHeader>
  );
}
