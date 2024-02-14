import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,  // Adjust the font size
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,  // Adjust the font size
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  tableContainer: {
    maxWidth: '60%',  // Adjust the width
    margin: '20px auto',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the list of categories from your API
    axios.get('http://localhost:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching category list:', error));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Categories List</div>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <StyledTableRow key={category.id}>
                <StyledTableCell>{category.id}</StyledTableCell>
                <StyledTableCell>{category.nom}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
