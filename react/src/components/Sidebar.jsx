import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AuthUser from './AuthUser';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { token, logout, user } = AuthUser();

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
            // Set the state to trigger redirection
            setRedirectToLogin(true);
        }
    };

    const menuItems = [
        {
            path: 'AddProduct',
            name: 'AddProduct',
            icon: <FaRegChartBar />
        },
        {
            path: 'productlist',
            name: 'Product List',
            icon: <FaCommentAlt />
        },
        {
            path: '/categorieliste',
            name: 'Categorie',
            icon: <FaShoppingBag />
        },
        {
            path: 'AddCategory',
            name: 'Add Category',
            icon: <FaThList />
        },
        {
            path: 'orderslist',
            name: 'Orders List',
            icon: <FaThList />
        }
    ];

    return (
        <div className="container">
            {redirectToLogin && <Navigate to="/login" />}
            <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
                        Logo
                    </h1>
                    <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItems.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                            {item.name}
                        </div>
                    </NavLink>
                ))}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {token && (
                        <Button color="inherit" onClick={logoutUser} style={{ width: '100%' }}>
                            <IconButton>
                                <FaSignOutAlt />
                            </IconButton>
                            Logout
                        </Button>
                    )}
                    {user && (
                        <div style={{ marginTop: '10px' }}>
                        </div>
                    )}
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
