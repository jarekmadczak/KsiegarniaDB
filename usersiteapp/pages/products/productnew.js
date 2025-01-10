import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from '../../components/Nav';
import Link from 'next/link';

// Styled components for the layout
const ProductPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 20px;
`;

const ProductImageWrapper = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
`;

const ProductInfoWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const ProductAuthor = styled.h3`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 15px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 15px;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: green;
  margin-bottom: 15px;
`;

const ProductDetailsWrapper = styled.div`
  font-size: 1rem;
  color: #444;
  margin-top: 20px;
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

export default function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products?id=${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <NavBar />
      <ProductPageWrapper>
        {/* Left - Product Image */}
        <ProductImageWrapper>
          <ProductImage src={product.images[0]} alt={product.title} />
        </ProductImageWrapper>

        {/* Right - Product Info */}
        <ProductInfoWrapper>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductAuthor>{product.author}</ProductAuthor>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>${product.price}</ProductPrice>

          {/* Additional Product Details */}
          <ProductDetailsWrapper>
            <ProductPublisher>Publisher: {product.publisher.name}</ProductPublisher>
            <ProductPublisher>Year: {product.publisher.year}</ProductPublisher>
            <ProductPages>Pages: {product.pages}</ProductPages>
            <ProductIsbn>ISBN: {product.isbn}</ProductIsbn>
          </ProductDetailsWrapper>
        </ProductInfoWrapper>
      </ProductPageWrapper>
    </div>
  );
}


