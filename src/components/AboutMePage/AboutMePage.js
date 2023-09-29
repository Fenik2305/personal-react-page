import React from "react";
import HeaderStyles from '../Header/Header.css'
import FooterStyles from '../Footer/Footer.css'
import Header from '../Header/Header';
import AboutMe from "../AboutMePage/AboutMe/AboutMe";
import Footer from '../Footer/Footer';

export default function AboutMePage() {
    return (
        <div className="AboutMePage">
            <Header />
            <AboutMe />
            <Footer />
        </div>
    );
}
