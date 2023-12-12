import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { convertDateFormat } from '../adminPage/dateFormatFunction.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

function convertData(createdAt, name, email, mssg) {
  return { createdAt, name, email, mssg };
}

export default function BasicTable() {
  const { user } = useAuthContext();

  const [paginatorCount, setPaginatorCount] = React.useState(0);
  const [paginatorPage, setPaginatorPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [messages, setMessages] = React.useState([]);

  const handleChangePage = async (event, newPage) => {
    try {
      const fetchedPage = await fetchPage(newPage, rowsPerPage);
      
      setMessages(fetchedPage["items"]);
      setPaginatorPage(newPage);
      setPaginatorCount(fetchedPage["totalItems"]);
    } catch (error) {
      console.log("Page fetching error:", error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    fetchPage(0, parseInt(event.target.value, 10));
  };

  const fetchPage = async (pageNum, limit) => {
    try {
      const response = await fetch(`/api/messages/message-pages/${user._id}?pageNum=${pageNum}&limit=${limit}&filter=createdAt&sort=asc`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const fetchedPage = await response.json();

      setMessages(fetchedPage["items"]);
      setPaginatorPage(fetchedPage["currentPage"]);
      setPaginatorCount(fetchedPage["totalItems"]);

      return fetchedPage;
    } catch (error) {
      console.log("Page fetching error:", error);
    }
  };

  React.useEffect(() => {
    fetchPage(0, rowsPerPage);
  }, []); 

  const rows = messages.map((message) =>
    convertData(
      convertDateFormat(message["createdAt"]),
      message["name"],
      message["email"],
      message["mssg"]
    )
  );

  return (
    <div className="messages-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Created</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.createdAt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.createdAt}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell
                  align="justify"
                  sx={{ maxWidth: '480px', textOverflow: 'ellipsis' }}
                >
                  {row.mssg}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={paginatorCount}
          page={paginatorPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[3, 5, 10]}
        />
      </TableContainer>
    </div>
  );
}