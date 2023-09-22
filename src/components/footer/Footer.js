import React from "react";
import ConnectWithMe from "./connect-with-me/ConnectWithMe";
import AboutMe from "./AboutMe";

export default function Footer() {
    return (
        <footer className="Footer">
            <AboutMe />
            <ConnectWithMe />
        </footer>
    );
}
