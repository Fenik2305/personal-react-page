import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { convertDateFormat } from './dateFormatFunction.js';

import RoleSelector from './roleSelector.js';
import DeleteUserIcon from './deleteUserIcon.js';
import DeleteMessageIcon from './deleteMessageIcon.js';

import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function CollapsibleTable() {
  const { user } = useAuthContext();
  const [rows, setRows] = useState([]);

  const [paginatorCount, setPaginatorCount] = React.useState(0);
  const [paginatorPage, setPaginatorPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function convertData(name, email, lastVisitAt, countMessages, role, editRole, deleteUser, messages) {
    return {
      name,
      email,
      lastVisitAt,
      countMessages,
      role,
      editRole,
      deleteUser,
      messages
    };
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      lastVisitAt: PropTypes.string.isRequired,
      countMessages: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      editRole: PropTypes.object.isRequired,
      deleteUser: PropTypes.object.isRequired,
      messages: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
          mssg: PropTypes.string.isRequired
        }),
      ).isRequired,
    }).isRequired,
  };

  const fetchPage = async (pageNum, itemsLimit, propFilter = "lastVisitAt", sortOrder = "asc") => {
    try {
      const params = new URLSearchParams({
        pageNum: encodeURIComponent(pageNum),
        itemsLimit: encodeURIComponent(itemsLimit),
        propFilter: encodeURIComponent(propFilter),
        sortOrder: encodeURIComponent(sortOrder),
      });
  
      const response = await fetch(`/api/user/userPages/?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      const fetchedPage = await response.json();

      const users = await fetchedPage["items"];

      setPaginatorPage(parseInt(fetchedPage["currentPage"]));
      setPaginatorCount(parseInt(fetchedPage["totalItems"]));

      const newRows = await Promise.all(users.map(async (user) => {
        return convertData(
          user["name"],
          user["email"],
          user["lastVisitAt"],
          user["messages"].length,
          user["role"],
          <RoleSelector email={user["email"]}
                        actualRole={user["role"]}
                        updateTable={fetchPage} 
                        updateTableParams={[pageNum, itemsLimit]}/>,
          <DeleteUserIcon email={user["email"]}
                          updateTable={fetchPage} 
                          updateTableParams={[pageNum, itemsLimit]}/>,
          user["messages"]
        );
      }));

      setRows(newRows);

    } catch (error) {
      alert("Page fetching error: ", error);
    }
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.lastVisitAt ? convertDateFormat(row.lastVisitAt) : ""}</TableCell>
          <TableCell align="center">{row.countMessages}</TableCell>
          <TableCell align="right">{row.role}</TableCell>
          <TableCell align="center">{row.email ? row.editRole : <Typography />}</TableCell>
          <TableCell align="center">{row.email ? row.deleteUser : <Typography />}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Messages
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>E-mail</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.messages.map((message) => (
                      <TableRow key={message.createdAt}>
                        <TableCell component="th" scope="row">
                          {convertDateFormat(message.createdAt)}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.mssg}</TableCell>
                        <TableCell align='right'>{<DeleteMessageIcon messageIdx={message["idx"]} 
                                                                     updateTable={fetchPage} 
                                                                     updateTableParams={[paginatorPage, rowsPerPage]}/>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const handleChangePage = (event, newPage) => {
    setPaginatorPage(newPage);
    fetchPage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPaginatorPage(0);
    fetchPage(0, parseInt(event.target.value, 10));
  };

  useEffect(() => {
    fetchPage(0, 5);
  }, []);

  return (
    <div className='users-table'>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell align="right">E-mail</TableCell>
                    <TableCell align="right">Last visit</TableCell>
                    <TableCell align="right">Count messages</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Edit Role</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>

                {rows.map((row) => (
                  <Row key={row.email} row={row} />
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