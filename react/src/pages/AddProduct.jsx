import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CssBaseline ,} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';

const AddProduct = () => {
    const [formData, setFormData] = useState({
      nom: '',
      prix: '',
      categorie_nom: '', 
      quantite: '',
      image: null,
    });
  
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      // Fetch the list of categories from your API
      axios.get('http://localhost:8000/api/categories')
        .then(response => setCategories(response.data))
        .catch(error => console.error('Error fetching category list:', error));
    }, []);
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'image' ? files[0] : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const postData = new FormData();
      for (const key in formData) {
        postData.append(key, formData[key]);
      }
  
      try {
        const response = await axios.post('http://localhost:8000/api/produits', postData);
        console.log(response.data); // Log the newly created product
  
        // Reset form fields
        setFormData({
          nom: '',
          prix: '',
          categorie_nom: '', 
          quantite: '',
          image: null,
        });
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
  
    return (
      <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Product Form
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              select // Use select for dropdown
              label="Category Name"
              name="categorie_nom" // Change to use nom instead of categorie_id
              value={formData.categorie_nom}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.nom} value={category.nom}>
                  {category.nom}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Prix"
              name="prix"
              type="number"
              value={formData.prix}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Quantite"
              name="quantite"
              type="number"
              value={formData.quantite}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Image"
              name="image"
              type="file"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  };
  
  export default AddProduct;
  

