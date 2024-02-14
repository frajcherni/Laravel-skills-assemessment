import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ProductItem from './ProductItem';
import useCart from './useCart';

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make an API call to fetch products
    fetch('http://localhost:8000/api/produits')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid container spacing={3} style={{ marginTop: '20px' }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
