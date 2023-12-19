import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from "../../hooks/useLogout";

import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function UserIcon() {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/');
    };

    const handleAdminMenu = () => {
        handleClose();
        navigate('/admin');
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

                {user && user.role === "admin" && (<MenuItem onClick={handleAdminMenu}>AdminMenu</MenuItem>)}

                {user && (<MenuItem onClick={handleLogout}>LogOut</MenuItem>)}

                {!user && (
                    <MenuItem onClick={handleClose}>
                        <Link className="UserActionsElement" to='/authpage'><label className='menuElement'>LogIn</label></Link>
                    </MenuItem>)}
            </Menu>
        </div>
    );
}
