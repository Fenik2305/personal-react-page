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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const messages = await response.json();

      return messages;
    } catch (error) {
      console.log("Messages fetching error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/user/`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const users = await response.json();

      return users["users"];
    } catch (error) {
      console.log("Users fetching error:", error);
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
          <TableCell align="right">{row.lastVisitAt}</TableCell>
          <TableCell align="center">{row.countMessages}</TableCell>
          <TableCell align="right">{row.role}</TableCell>
          <TableCell align="center">{row.editRole}</TableCell>
          <TableCell align="center">{row.deleteUser}</TableCell>
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
                      <TableCell>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.messages.map((message) => (
                      <TableRow key={message._id}>
                        <TableCell component="th" scope="row">
                          {convertDateFormat(message.createdAt)}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.mssg}</TableCell>
                        <TableCell align='right'>{<DeleteMessageIcon _id={message._id} callback={convertDataToRows}/>}</TableCell>
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

  const convertDataToRows = async () => {
    try {
      const messages = await fetchMessages();
      const users = await fetchUsers();

      const newRows = [];

      users.forEach(async (user) => {
        const userMessages = messages.filter(function (message) {
          return message.author === user._id;
        });

        newRows.push(
          convertData(
            user["name"],
            user["email"],
            convertDateFormat(user["lastVisitAt"]),
            userMessages.length,
            user["role"],
            <RoleSelector userID={user._id} actualRole={user["role"]} callback={convertDataToRows}/>,
            <DeleteUserIcon _id={user._id} messages={userMessages} callback={convertDataToRows}/>,
            userMessages
          )
        );
      });

      const unregMessages = messages.filter(function (message) {
        return message.author === "unregistred";
      });
      newRows.push(
        convertData(
          "unregistred\nusers",
          "",
          "",
          unregMessages.length,
          "",
          <Typography />,
          <Typography />,
          unregMessages
        )
      );

      setRows(newRows);
    } catch (error) {
      console.log("Data fetching error:", error);
    }
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    convertDataToRows();
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

                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <Row key={row.email} row={row} />
                ))}
                
                </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[3, 5, 10]}
            />
        </TableContainer>
    </div>
  );
}