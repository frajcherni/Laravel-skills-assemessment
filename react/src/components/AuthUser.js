// AuthUser.js
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Guest from './navbar/guest';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  const getUser = () => {
    const userString = localStorage.getItem('user');
    const user_detail = JSON.parse(userString);
    return user_detail;
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);

    if (user.UserType === "client") {

        navigate('/');
    } else {
      console.log('Navigating to /dashboard');
      navigate('/orderslist');
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    http,
    logout
  }
}
