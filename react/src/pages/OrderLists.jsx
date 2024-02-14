import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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

const OrderLists = () => {
  const [groupedCommands, setGroupedCommands] = useState([]);

  useEffect(() => {
    const fetchAllOrders = () => {
      axios.get('http://localhost:8000/api/allcommands')
        .then((res) => {
          console.log('API response:', res.data); // Add this line for debugging
          const grouped = groupCommandsByDateTime(res.data.all_commands);
          setGroupedCommands(grouped);
        })
        .catch((error) => {
          console.error('Error fetching grouped command list:', error);
          // Handle the error as needed
        });
    };

    const groupCommandsByDateTime = (commands) => {
      const grouped = {};
      commands.forEach((command) => {
        const dateTimeKey = new Date(command.created_at).toLocaleString();
        if (!grouped[dateTimeKey]) {
          grouped[dateTimeKey] = [command];
        } else {
          grouped[dateTimeKey].push(command);
        }
      });

      return Object.values(grouped);
    };

    fetchAllOrders();
  }, []);

  return (
    <div style={styles.container}>
              <div style={styles.heading}>Orders List</div>

      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableBody>
            {groupedCommands.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {group.map((command, index) => (
                  <TableRow key={`${groupIndex}-${index}`}>
                    <StyledTableCell align="left">Command ID:</StyledTableCell>
                    <StyledTableCell align="left">{command.id}</StyledTableCell>
                    <StyledTableCell align="left">Produit:</StyledTableCell>
                    <StyledTableCell align="left">{command.nom}</StyledTableCell>
                    <StyledTableCell align="left">Quantite:</StyledTableCell>
                    <StyledTableCell align="left">{command.quantite}</StyledTableCell>
                    <StyledTableCell align="left">Total:</StyledTableCell>
                    <StyledTableCell align="left">{index === 0 ? command.total : '-'}</StyledTableCell>
                    <StyledTableCell align="left">Created At:</StyledTableCell>
                    <StyledTableCell align="left">{new Date(command.created_at).toLocaleString()}</StyledTableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderLists;
