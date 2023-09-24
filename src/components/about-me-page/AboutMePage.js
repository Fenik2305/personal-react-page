import React from "react";
import HeaderStyles from '../header/Header.css'
import FooterStyles from '../footer/Footer.css'
import Header from '../header/Header';
import AboutMe from "../about-me-page/about-me/AboutMe";
import Footer from '../footer/Footer';

export default function AboutMePage() {
    return (
        <div className="AboutMePage">
            <Header />
            <AboutMe />
            <Footer />
        </div>
    );
}
