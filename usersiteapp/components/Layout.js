import styled from 'styled-components';


export const LoyaltySection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f8;
  padding: 60px 20px;
  gap: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const LoyaltyInfo = styled.div`
  width: 50%;
  text-align: left;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const LoyaltyTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

export const LoyaltyDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const LoyaltyImage = styled.img`
  width: 40%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 80%;
    margin-bottom: 30px;
  }
`;
const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  flex-direction: column;
  margin-top: 5vh;
`;

const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 40px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1200px;
`;

const ProductImageWrapper = styled.div`
  flex: 1;
  margin-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageWrapper = styled.div`
  display: flex;
  margin-top: 10vh;
  min-height: 80vh;
`;

const SearchWrapper = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 300px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 20px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 20px;
`;

const PriceSlider = styled.input`
  width: 100%;
  margin-top: 10px;
`;

const PriceRangeLabel = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  width: 100%;
`;

const ProductsGridWrapper = styled.div`
  flex: 3;
  margin-top: 3vh;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;


const CartPageWrapper = styled.div`
  padding: 20px;
  margin-top: 20vh;
  max-width: 1200px;
  margin: 10vh auto;
  display: flex;
  gap: 20px;
`;

const OrdersContainer = styled.div`
  flex: 2;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const CartHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.75rem;
  font-weight: bold;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const CartInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
`;


const ProductAuthor = styled.h3`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 15px;
`;



const ProductDetails = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin-top: 20px;
  width: 90%;
`;

const ProductPublisher = styled.div`
  margin-bottom: 10px;
`;

const ProductPages = styled.div`
  margin-bottom: 10px;
`;

const ProductIsbn = styled.div`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;




// Background Section
export const Bg = styled.div`
  background-color: #f9f9f9;
  color: #333;
  padding: 50px 0;
  text-align: center;
`;

// Title and Description Section
export const TextTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
  font-family: 'Merriweather', serif;
`;
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
  font-family: 'Merriweather', serif;
`;
export const Desc = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  font-family: 'Roboto', sans-serif;
`;

// Main Product Wrapper
export const MainProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-right:20vh;
   margin-left:20vh;
  background: linear-gradient(135deg, #f0f4f8, #dfe6e9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  gap: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 15px;
  margin-top: 20px;
  flex: 1;
`;

export const ProductInfoWrapper = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 20px;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
  }
`;

export const Button = styled.button`
  padding: 12px 25px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

// Products Grid Section
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); // For smaller screens, only 1 column
  gap: 5px;  // Small gap between items

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);  // 2 columns on medium screens
    gap: 5px;  // Small gap between items
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);  // 4 columns on larger screens
    gap: 5px;  // Small gap between items
  }
`;

// Product Card
export const ProductCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  padding: 8px;
  width: 100%;  // Make sure product card takes full width in grid cells

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Keep the same as before for other components, just ensuring that gaps are smaller.



export const ProductImageCard = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

export const ProductInfo = styled.div`
  padding: 15px 0;
`;

export const ProductTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0070f3;
`;

export const ProductDescription = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
`;

// Footer Section
export const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 0;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

export const FooterText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const FooterLink = styled.a`
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// About Section
export const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f6f8;
  padding: 60px 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const AboutImage = styled.img`
  width: 40%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 50px;

  @media screen and (max-width: 768px) {
    width: 80%;
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

export const AboutInfo = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;
export const ProuctsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2vh;
  color: #333;
`;

export const AboutDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
`;
