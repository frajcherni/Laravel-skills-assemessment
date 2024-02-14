import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthUser from './AuthUser';

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

export default function CustomizedTables() {
  const { http, user } = AuthUser();
  const [groupedCommands, setGroupedCommands] = React.useState([]);

  React.useEffect(() => {
    const fetchGroupedCommands = () => {
      if (user && user.id) {
        http.get(`http://localhost:8000/api/user-commandes/${user.id}`)
          .then((res) => {
            const grouped = groupCommandsByDateTime(res.data.user_commandes);
            setGroupedCommands(grouped);
          })
          .catch((error) => {
            console.error('Error fetching grouped command list:', error);
            // Handle the error as needed
          });
      }
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

    fetchGroupedCommands();
  }, [http, user]);

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Products List</div>
      {user && user.email && (
        <div>User Email: {user.email}</div>
      )}
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
}

