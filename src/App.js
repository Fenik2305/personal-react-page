import './App.css';
import React, { useState } from 'react';
import GeneralInfo from './components/HomePage/GeneralInfo/GeneralInfo';
import GeneralInfoStyles from './components/HomePage/GeneralInfo/GeneralInfo.css';
import AboutMe from './components/AboutMePage/AboutMe/AboutMe';
import AboutMeStyles from './components/AboutMePage/AboutMe/AboutMe.css';
import Header from './components/Header/Header';
import HeaderStyles from './components/Header/Header.css';
import Footer from './components/Footer/Footer';
import FooterStyles from './components/Footer/Footer.css';
import Contacts from './components/ContactsPage/Contacts/Contacts';

function App() {
    const [page, setPage] = useState('contact');

    let currentPage;
    switch (page) {
      case 'home':
        currentPage = <GeneralInfo />;
        break;
      case 'about':
        currentPage = <AboutMe />;
        break;
      case 'contact':
        currentPage = <Contacts />;
        break;
      default:
        currentPage = <GeneralInfo />;
    }

    return (
      <div className='App'>
        <Header setPage={setPage} />
        {currentPage}
        <Footer />
      </div>
    );
  }
  
  export default App;
  