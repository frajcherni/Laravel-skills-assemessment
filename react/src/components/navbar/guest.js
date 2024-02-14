import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';
import Login from '../login';
import Register from '../register';
import AuthUser from '../AuthUser';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Panier from '../panier';
import PanierPage from '../PanierPage';
import useCart from '../useCart'; // Import the useCart hook

import { useState } from 'react';
function Guest() {
  const { getToken } = AuthUser();
  const isLoggedIn = getToken();

  const { cart, addToCart } = useCart(); // Use the useCart hook

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FRAJ Shop
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/panier">
            Panier
          </Button>
      
        </Toolbar>
      </AppBar>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home addToCart={addToCart} />} />

          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panier" element={<Panier cart={cart} />} />

        </Routes>
      </div>
    </>
  );
}

export default Guest;
