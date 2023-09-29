import React from "react";
import HeaderStyles from '../Header/Header.css'
import GeneralInfoStyles from './GeneralInfo/GeneralInfo.css'
import FooterStyles from '../Footer/Footer.css'
import Header from '../Header/Header';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import Footer from '../Footer/Footer';

export default function HomePage() {
    return (
        <div className="HomePage">
            <Header />
            <GeneralInfo />
            <Footer />
        </div>
    );
}
