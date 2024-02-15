import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { TextField, Button, Typography, Container, CssBaseline, Select, MenuItem, InputLabel } from '@mui/material';

export default function Register() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [UserType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // api call
    http.post('/register', { email: email, password: password, UserType: UserType }).then((res) => {
      navigate('/login');
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="card p-4">
        <Typography component="h1" variant="h5" className="text-center mb-3">
          Register
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel id="user-type-label">User Type</InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={UserType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" fullWidth variant="contained" color="primary" onClick={submitForm} mt={4}>
            Register
          </Button>
        </div>
      </div>
    </Container>
  );
}
