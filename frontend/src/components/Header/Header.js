import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { Badge } from "@mui/material";
import { useMessagesContext } from "../../hooks/useMessagesContext";

export default function Header() {
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

    console.log(messages)

    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <Link className="HeaderNavigationElement" to='/'>HOME</Link>
                <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
                <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
            </nav>
            <Badge badgeContent={messages ? messages.length : 0} color='error'>
                <img className="HeaderMailIcon" src="/icons/mail-icon.png" alt="mail-icon" height={35} width={35}></img>
            </Badge>
        </header>
    );
}
