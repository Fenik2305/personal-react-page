import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { Badge, Button, ButtonBase } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";
import { useMessagesContext } from "../../hooks/useMessagesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Header() {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { messages, dispatch } = useMessagesContext()

    useEffect(() => {
      const fetchMessages = async () => {
        const response = await fetch('/api/messages')
        const json = await response.json()

        if (response.ok) {
          dispatch({type: "SET_MESSAGES", payload: json})
        }
      }

      fetchMessages()
    }, [dispatch])

    const handleLogout = () => {
      logout()
    }

    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <Link className="HeaderNavigationElement" to='/'>HOME</Link>
                <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
                <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
            </nav>

            <div className="UserActions">
              {!user && (<nav className="UserActionsBlock">
                <Link className="UserActionsElement" to='/login'>LOGIN</Link>
                <Link className="UserActionsElement" to='/signup'>SIGNUP</Link>
              </nav>)}

              {user && <div>{user.email}</div>}

              {user && (
                <Button
                    className="UserActionsElement"
                    variant="outline"
                    size='large'
                    style={{maxWidth: '170px'}}
                    onClick={handleLogout}>
                    Log out
                </Button>)}
              
              {user && (<Badge badgeContent={messages ? messages.length : 0} color='error'>
                  <Link to='/messages'>
                    <img className="UserActionsElement" src="/icons/mail-icon.png" alt="mail-icon" height={35} width={35}></img>
                  </Link>
              </Badge>)}
            </div>
        </header>
    );
}
