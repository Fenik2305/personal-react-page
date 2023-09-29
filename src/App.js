import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import AboutMePage from './components/AboutMePage/AboutMePage';
import ContactsPage from './components/ContactsPage/ContactsPage';

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
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/about' element={<AboutMePage />}/>
          <Route path='/contactus' element={<ContactsPage />}/>
        </Routes>
      </div>
    );
  }
  
  export default App;
  