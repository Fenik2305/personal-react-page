import React from "react";
import HeaderStyles from '../header/Header.css'
import GeneralInfoStyles from './general-info/GeneralInfo.css'
import FooterStyles from '../footer/Footer.css'
import Header from '../header/Header';
import GeneralInfo from './general-info/GeneralInfo';
import Footer from '../footer/Footer';

export default function HomePage() {
    return (
        <div className="HomePage">
            <Header />
            <GeneralInfo />
            <Footer />
        </div>
    );
}
