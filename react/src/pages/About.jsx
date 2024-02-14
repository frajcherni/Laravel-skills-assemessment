import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ProductList = () => {
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
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8000/storage/${product.image}`}
              alt={product.nom}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.nom}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Price: ${product.prix}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {product.quantite}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.categorie ? product.categorie.nom : ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
