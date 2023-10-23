import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useMessagesContext } from './hooks/useMessagesContext';
import GeneralInfo from './components/HomePage/GeneralInfo';
import GeneralInfoStyles from './components/HomePage/GeneralInfo.css';
import AboutMe from './components/AboutMePage/AboutMe';
import AboutMeStyles from './components/AboutMePage/AboutMe.css';
import Contacts from './components/ContactsPage/Contacts';
import ContactsStyles from './components/ContactsPage/Contacts.css';
import Header from './components/Header/Header';
import HeaderStyles from './components/Header/Header.css';
import Footer from './components/Footer/Footer';
import FooterStyles from './components/Footer/Footer.css';

function App() {
    return (
      <div className='App'>
        <Header/> {/* messagesNum={messages.length}*/}
        <Routes>
          <Route path='/' element={<GeneralInfo />}/>
          <Route path='/about' element={<AboutMe />}/>
          <Route path='/contactus' element={<Contacts />}/>
        </Routes>
        <Footer />
      </div>
    );
  }
  
  export default App;
  