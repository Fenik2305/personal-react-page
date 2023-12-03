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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

function createData(name, email, lastVisitAt, countMessages, role, edit, messages) {
  return {
    name,
    email,
    lastVisitAt,
    countMessages,
    role,
    edit,
    messages
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell align="right">{row.countMessages}</TableCell>
        <TableCell align="right">{row.role}</TableCell>
        <TableCell align="right">{row.edit}</TableCell>
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
                    <TableCell>Name</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell align="right">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.messages.map((message) => (
                    <TableRow key={message._id}>
                      <TableCell component="th" scope="row">
                        {message.createdAt}
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.mssg}</TableCell>
                      <TableCell align='right'>{<DeleteForeverIcon />}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastVisitAt: PropTypes.string.isRequired,
    countMessages: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    edit: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mssg: PropTypes.string.isRequired
      }),
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const { user } = useAuthContext();
  const [rows, setRows] = React.useState([]);

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
          createData(
            user["name"],
            user["email"],
            user["lastVisitAt"],
            userMessages.length,
            user["role"],
            <DeleteForeverIcon />,
            userMessages
          )
        );
      });

      setRows(newRows);
    } catch (error) {
      console.log("Data fetching error:", error);
    }
  };

  useEffect(() => {
    convertDataToRows();
  }, [convertDataToRows]);

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
                    <TableCell align="right">Edit</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <Row key={row.name} row={row} />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}