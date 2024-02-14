import React from 'react';
import {BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Analytics from './pages/AddProduct.jsx';
import Comment from './pages/AddCategory.jsx';
import Product from './pages/CategoryList.jsx';
import ProductList from './pages/ProductList.jsx';
import AuthUser from './components/AuthUser';
import Auth from './components/navbar/auth.js';
import Guest from './components/navbar/guest.js';
import Register from './components/register.js';
import Home from './components/home.js';
import Login from './components/login.js';
import './App.css';

function App() {
  const { getToken, user } = AuthUser();

  if (!getToken() || (user && user.UserType === "client")) {
    return (

      <Guest />
             

    );
  }

  return (
    <Auth>
      <Routes>
          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productList" element={<ProductList />} />
      
      </Routes>
    </Auth>
  );
}

export default App;
