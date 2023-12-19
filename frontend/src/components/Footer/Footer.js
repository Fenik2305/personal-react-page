import React from "react";
import ConnectWithMe from "./ConnectWithMe/ConnectWithMe";
import AboutMe from "./AboutMe";

export default function Footer() {
    return (
        <footer className="Footer">
            <AboutMe />
            <ConnectWithMe />
        </footer>
    );
}
