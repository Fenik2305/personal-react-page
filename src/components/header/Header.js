import React from "react";

export default function Header() {
    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <a className="HeaderNavigationElement">HOME</a>
                <a className="HeaderNavigationElement">ABOUT</a>
                <a className="HeaderNavigationElement">CONTACTS</a>
            </nav>
            <img className="HeaderMailIcon" src="/icons/mail-icon.png" alt="mail-icon" height={40} width={40}></img>
        </header>
    );
}
