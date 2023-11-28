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

const data = {
  "users": [
    {
      "name": "Alex",
      "email": "email@dot.com",
      "lastVisit": "01-01-2023",
      "role": "user",
      "messages": [
        {
          "date": "2020-01-05",
          "name": "alex",
          "mssg": "first alex's message"
        },
        {
          "date": "2020-01-08",
          "name": "alex",
          "mssg": "second alex's message"
        }
      ]
    },
    {
      "name": "Ice",
      "email": "email@dot.com",
      "lastVisit": "01-02-2023",
      "role": "admin",
      "messages": [
        {
          "date": "2020-01-01",
          "name": "ice",
          "mssg": "first ice's message"
        },
        {
          "date": "2020-01-01",
          "name": "ice",
          "mssg": "second ice's message"
        },
        {
          "date": "2020-01-03",
          "name": "ice",
          "mssg": "third ices's message"
        }
      ]
    },
    {
      "name": "anon",
      "email": "N/A",
      "lastVisit": "N/A",
      "role": "user",
      "messages": [
      ]
    },
    {
      "name": "unregistred",
      "email": "N/A",
      "lastVisit": "N/A",
      "role": "user",
      "messages": [
        {
          "date": "2020-01-01",
          "name": "a",
          "mssg": "text"
        },
        {
          "date": "2020-01-01",
          "name": "b",
          "mssg": "text text"
        }
      ]
    }
  ]
}

function createData(name, email, lastVisit, countMessages, role, edit, messages) {
  return {
    name,
    email,
    lastVisit,
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
        <TableCell align="right">{row.lastVisit}</TableCell>
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
                    <TableRow key={message.date}>
                      <TableCell component="th" scope="row">
                        {message.date}
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
    lastVisit: PropTypes.string.isRequired,
    countMessages: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    edit: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mssg: PropTypes.string.isRequired
      }),
    ).isRequired,
  }).isRequired,
};

console.log(data)

const rows = data["users"].map(user => (
  createData(user["name"], user["email"], user["lastVisit"], user["messages"].length, user["role"], <DeleteForeverIcon />, user["messages"])
)) 

export default function CollapsibleTable() {
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