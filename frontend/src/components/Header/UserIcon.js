import { useState } from 'react';
import { Link } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from "../../hooks/useLogout";

import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function UserIcon( props ) {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return ( 
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
            </IconButton>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                {user && (<MenuItem onClick={logout}>LogOut</MenuItem>)}

                {!user && (
                    <MenuItem onClick={handleClose}>
                        <Link className="UserActionsElement" to='/authpage'><label className='menuElement'>LogIn</label></Link>
                    </MenuItem>)}
            </Menu>
        </div>
    );
}




<Link className="UserActionsElement" to='/signup'>SIGNUP</Link>
