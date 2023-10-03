import React from "react";
import { Link } from "react-router-dom"
import { Badge } from "@mui/material";

export default function Header({messagesNum}) {
    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <Link className="HeaderNavigationElement" to='/'>HOME</Link>
                <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
                <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
            </nav>
            <Badge badgeContent={messagesNum} color='error'>
                <img className="HeaderMailIcon" src="/icons/mail-icon.png" alt="mail-icon" height={35} width={35}></img>
            </Badge>
        </header>
    );
}
