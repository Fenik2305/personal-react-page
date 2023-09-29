import React from "react";
import HeaderStyles from '../Header/Header.css'
import ContactsStyles from "./Contacts/Contacts.css";
import FooterStyles from '../Footer/Footer.css'
import Header from '../Header/Header';
import Contacts from "./Contacts/Contacts";
import Footer from '../Footer/Footer';

export default function ContactsPage() {
    return (
        <div className="ContactsPage">
            <Header />
            <Contacts />
            <Footer />
        </div>
    );
}
