import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import NavBar from '../components/Nav';
import {
    Footer,FooterText
  } from '../components/Layout';
// Styled components for layout and search
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

const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImageCard = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 10px 0;
`;

const ProductPrice = styled.div`
  font-size: 1rem;
  color: green;
`;


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and categories from API
        const productsResponse = await axios.get('/api/products');
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get('/api/categories');
        setCategories(categoriesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on the search query, price range, and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div >
      <NavBar />
      <PageWrapper>
        {/* Left - Search Form */}
        <SearchWrapper>
          <h3>wyszukaj ksiażki</h3>
          <SearchInput
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Price Range Filter */}
          <FilterWrapper>
            <PriceRangeLabel>cena: {priceRange[0]} - ${priceRange[1]} pln</PriceRangeLabel>
            <PriceSlider
              type="range"
              min="0"
              max="1000"
              step="1"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, e.target.value])}
            />
          </FilterWrapper>

          {/* Category Dropdown */}
          <FilterWrapper>
            kategorie:
            <CategorySelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Wszystkie kategorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </CategorySelect>
          </FilterWrapper>
        </SearchWrapper>

        {/* Right - Product Grid */}
        <ProductsGridWrapper>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id}>
              <Link href={`/product?id=${product._id}`} passHref>
                <ProductImageCard src={product.images[0]} alt={product.title} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.price} pln</ProductPrice>
                 
                </ProductInfo>
              </Link>
            </ProductCard>
          ))}
        </ProductsGridWrapper>
      </PageWrapper>

         <Footer>
              <FooterText>&copy; 2025 E-Biblioteka. All Rights Reserved.</FooterText>

            </Footer>
    </div>
  );
}
