import React from "react";
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <Link className="HeaderNavigationElement" to='/'>HOME</Link>
                <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
                <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
            </nav>
            <img className="HeaderMailIcon" src="/icons/mail-icon.png" alt="mail-icon" height={40} width={40}></img>
        </header>
    );
}
