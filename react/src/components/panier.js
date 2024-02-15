import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
} from '@mui/material';
import useCart from './useCart';
import AuthUser from './AuthUser';
import insertOrder from './InsertOrder';
import { Link, useNavigate } from 'react-router-dom';

const Panier = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { getToken, user } = AuthUser();
  const isLoggedIn = getToken();
  const navigate = useNavigate();

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      // Ensure that newQuantity is a valid number
      if (isNaN(newQuantity)) {
        throw new Error('Invalid quantity value');
      }

      const response = await axios.put(
        `http://localhost:8000/api/products/${productId}/updateQuantity`,
        { quantite: newQuantity },
      );

      console.log('API response:', response.data);

      if (!response.data.success) {
        throw new Error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      // Handle errors if necessary
    }
  };

  const handlePurchase = async () => {
    try {
      // Calculate the total amount
      const totalAmount = cart.reduce((total, item) => total + item.prix * item.cartQuantity, 0);

      const discount = totalAmount > 100 ? 0.25 * totalAmount : 0;

      const success = await insertOrder(user.id, cart, getToken(), totalAmount, discount);

      if (success) {
        clearCart(); // Clear the cart after a successful purchase
        setSnackbarOpen(true); // Open the snackbar
        for (const item of cart) {
          const updatedQuantity = item.quantite - item.cartQuantity;
          await updateProductQuantity(item.id, updatedQuantity);
        }
      }
    } catch (error) {
      console.error('Error handling purchase:', error);
    }
  };

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.prix * item.cartQuantity, 0);

  const discount = totalAmount > 100 ? 0.25 * totalAmount : 0;

  return (
    <div
      style={{
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <table style={{ width: '100%', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Typography>{item.nom}</Typography>
                    </td>
                    <td>
                      <Typography>{item.prix} DT</Typography>
                    </td>
                    <td>
                      <Typography>
                        <Button
                          size="small"
                          disabled={item.cartQuantity <= 1}
                          onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        >
                          -
                        </Button>
                        {item.cartQuantity}
                        <Button size="small" onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}>
                          +
                        </Button>
                      </Typography>
                    </td>
                    <td>
                      <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">Total:</td>
                  <td>{totalAmount.toFixed(2)} DT</td>
                  <td></td>
                </tr>
                {totalAmount > 100 && (
                  <tr>
                    <td colSpan="2">Discount:</td>
                    <td>- {discount.toFixed(2)} DT</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={clearCart}>Clear Cart</Button>
          <Button
            onClick={handlePurchase}
            variant="contained"
            color="primary"
            disabled={!isLoggedIn || cart.length === 0}
          >
            Purchase
          </Button>
          <Link to="/">
            <Button>Go Shopping</Button>
          </Link>
        </CardActions>
      </Card>
      {/* Snackbar for success message */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
        sx={{ marginTop: '10px' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '300px', height: '70px' }}>
          Purchase successful! 🎉
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Panier;
