import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import useCart from './useCart';

const ProductItem = ({ product }) => {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
    setAdded(false);
  };

  return (
    <Card>
      <CardMedia component="img" height="140" image={`http://localhost:8000/storage/${product.image}`} alt={product.nom} />
      <CardContent>
    
        <Typography variant="h6" component="div">
          {product.nom}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Price: {product.prix} DT
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Quantity: {product.quantite}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.categorie_nom}
        </Typography>

        {isInCart(product) ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRemoveFromCart}
          >
            Product Added
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            variant="outlined"
            color="primary"
            disabled={product.quantite === 0 || added}
          >
            {added ? 'Product Added' : 'Add to Cart'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
