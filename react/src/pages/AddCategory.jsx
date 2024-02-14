import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  formContainer: {
    maxWidth: '400px',
    margin: '20px auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    marginTop: '10px',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    // Call your API to add the new category using axios.post
    axios.post('http://localhost:8000/api/categories', { nom: categoryName })
      .then(response => {
        console.log('Category added successfully:', response.data);
        // Reset the category name field
        setCategoryName('');
        // Optionally, you can perform additional actions or update the category list
      })
      .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Add New Category</div>
      <div style={styles.formContainer}>
        <form style={styles.form}>
          <TextField
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;