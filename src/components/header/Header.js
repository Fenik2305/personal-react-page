import React from "react";

export default function Header({ setPage }) {
    return (
        <header className="Header">
            <nav className="HeaderNavigationBlock">
                <a onClick={() => setPage('home')} className="HeaderNavigationElement">HOME</a>
                <a onClick={() => setPage('about')} className="HeaderNavigationElement">ABOUT</a>
                <a onClick={() => setPage('contact')} className="HeaderNavigationElement">CONTACTS</a>
            </nav>
            <img className="HeaderMailIcon" src="/icons/mail-icon.png" alt="mail-icon" height={40} width={40}></img>
        </header>
    );
}
