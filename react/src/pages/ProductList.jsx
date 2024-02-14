import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your API
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setProductList(data))
      .catch(error => console.error('Error fetching product list:', error));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Products List</div>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Category ID</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.id}</StyledTableCell>
                <StyledTableCell align="right">{product.nom}</StyledTableCell>
                <StyledTableCell align="right">{product.prix}</StyledTableCell>
                <StyledTableCell align="right">{product.categorie_nom}</StyledTableCell>
                <StyledTableCell align="right">{product.quantite}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
