import React, { useEffect } from "react";
import { Link } from "react-router-dom"

import { Badge, Button } from "@mui/material";

import { useMessagesContext } from "../../hooks/useMessagesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import UserIcon from './UserIcon'

export default function Header() {
    const { user } = useAuthContext()
    const { messages, dispatch } = useMessagesContext()

    useEffect(() => {
      const fetchMessages = async () => {
        const response = await fetch(`/api/messages/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: "SET_MESSAGES", payload: json})
        }
      }

      if (user) {
        fetchMessages()
      }
    }, [user, dispatch])

    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <Link className="HeaderNavigationElement" to='/'>HOME</Link>
                <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
                <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
            </nav>

            <div className="UserActions">
              {user && <div>{user.email}</div>}

              {user && (<Badge badgeContent={messages ? (messages.length > 0 ? messages.length : 0) : 0} color='error'>
                  <Link to='/messages'>
                    <img className="UserActionsElement" src="/icons/mail-icon.png" alt="mail-icon" height={35} width={35}></img>
                  </Link>
              </Badge>)}
              
              <UserIcon />
            </div>
        </header>
    );
}
