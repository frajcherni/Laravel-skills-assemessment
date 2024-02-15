import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../home';
import AuthUser from '../AuthUser';
import Sidebar from '../Sidebar';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CategoryList from '../../pages/CategoryList';
import AddProduct from '../../pages/AddProduct';
import ProductList from '../../pages/ProductList';
import AddCategory from '../../pages/AddCategory';
import OrderLists from '../../pages/OrderLists';
import Panier from '../panier';
import Dashboard from '../dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Auth() {
  const { token, logout, user } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  }

  return (
    <div>
      {user && user.UserType === 'admin' && <Sidebar />}
      {user && user.UserType !== 'admin' && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button color="inherit" component={Link} to="/">
              <HomeIcon /> Shop
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              <DashboardIcon /> Dashboard
            </Button>
            <Button color="inherit" onClick={logoutUser}>
              <LogoutIcon /> Logout
            </Button>
            {/* Render "Panier" only for non-admin users */}
            <Button color="inherit" component={Link} to="/panier">
              <ShoppingCartIcon /> Panier
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <div className="container">
        <Routes>
          {user && user.UserType === 'admin' ? (
            <>
              {/* Routes for admin */}
              <Route path="/categorieliste" element={<CategoryList />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/AddCategory" element={<AddCategory />} />
              <Route path="/orderslist" element={<OrderLists />} />
            </>
          ) : (
            <>
              {/* Routes for non-admin */}
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Render "Panier" only for non-admin users */}
              <Route path="/panier" element={<Panier />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default Auth;
