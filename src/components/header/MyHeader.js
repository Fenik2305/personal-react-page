import React from "react";

export default function MyHeader() {
    return (
        <header className="App-header">
            <h1>Welcome!</h1>
            <nav className="App-navigation">
                <a className="App-navigation-element"><b>Home</b></a>
                <a className="App-navigation-element">About</a>
                <a className="App-navigation-element">Contacts</a>
            </nav>
        </header>
    );
}
