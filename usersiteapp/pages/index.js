import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Nav';
import Link from 'next/link';
import {
  LoyaltySection, LoyaltyInfo, LoyaltyTitle, LoyaltyDescription, LoyaltyImage,TextTitle,ProuctsTitle,Bg,Title,Desc,MainProductWrapper,
  ProductImage,ProductInfoWrapper,Button,ProductsGrid,ProductCard,ProductImageCard,ProductInfo,ProductTitle,ProductPrice,ProductDescription,
  Footer,FooterText,AboutSection,AboutImage,AboutInfo,AboutTitle,AboutDescription,
} from '../components/Layout'; // Importing the styled components

import Center from '../components/Center';

export default function Home() {
  const [mainProduct, setMainProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainProductResponse = await axios.get('/api/attualmain');
        setMainProduct(mainProductResponse.data.mainProduct);

        const productsResponse = await axios.get('/api/products');
        setProducts(productsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const limitedProducts = products.slice(0, 6);

  return (
    <div>
      <NavBar />
      <Bg>
        <Center>
          {mainProduct && (
            <MainProductWrapper>
              <ProductImage src={mainProduct.mainImage} alt={mainProduct.product.title} />
              <ProductInfoWrapper>
                <TextTitle>BestSeller</TextTitle>
                <Title>{mainProduct.product.title}</Title>
                <Desc>{mainProduct.product.description}</Desc>
                <Button as="a" href={`/product?id=${mainProduct.product._id}`}>
                  See More
                </Button>
              </ProductInfoWrapper>
            </MainProductWrapper>
          )}
        </Center>
      </Bg>
      <Center>
      <ProuctsTitle>Nasze Produkty</ProuctsTitle>
      <ProductsGrid>
        {limitedProducts.map((product) => (
          <ProductCard key={product._id}>
            <Link href={`/product?id=${product._id}`} passHref>
              <ProductImageCard src={product.images[0]} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price} pln</ProductPrice>
              </ProductInfo>
            </Link>
          </ProductCard>
        ))}
      </ProductsGrid>
</Center>
<AboutSection>
        <AboutImage src="https://bi.im-g.pl/im/ba/7d/1b/z28826298IEG,Ksiegarnia-Tarabuk-w-Zamku-Ujazdowskim.jpg" alt="About Us" />
        <AboutInfo>
          <AboutTitle>O Nas</AboutTitle>
          <AboutDescription>
            Jesteśmy pasjonatami książek i technologii. E-Biblioteka to miejsce, gdzie możesz
            znaleźć najnowsze i najlepsze książki w przystępnych cenach. Nasza misja to
            łączenie miłości do literatury z nowoczesnym podejściem do sprzedaży online. Dzięki
            intuicyjnej platformie i szerokiemu wyborowi, zakupy w naszej bibliotece to czysta
            przyjemność.
          </AboutDescription>
        </AboutInfo>
      </AboutSection>
<LoyaltySection>
      <LoyaltyInfo>
        <LoyaltyTitle>Nowość!! Spotkania z autorami</LoyaltyTitle>
        <LoyaltyDescription>
        Organizujemy wyjątkowe spotkania z autorami książek, gdzie możesz poznać swoich ulubionych pisarzy osobiście, zadać
          pytania i zdobyć autografy! Każde spotkanie to niepowtarzalna okazja do rozmowy, inspiracji oraz zakupu książek
          prosto od autora. Dołącz do nas i bądź częścią tych magicznych chwil! Informacje o wydażeniach mozna znaleźć na naszych socialach
        </LoyaltyDescription>
      </LoyaltyInfo>
      <LoyaltyImage src="https://louharry.com/wp-content/uploads/2024/02/iap-cold.jpg?w=816" alt="Program Lojalnościowy" />
    </LoyaltySection>
      <Footer>
        <FooterText>&copy; 2025 E-Biblioteka. All Rights Reserved.</FooterText>

      </Footer>
    </div>
  );
}
