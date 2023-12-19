import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';

import GeneralInfo from './components/HomePage/GeneralInfo';
import AboutMe from './components/AboutMePage/AboutMe';
import Contacts from './components/ContactsPage/Contacts';
import MessagesList from './components/MessagesList/MessageList.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './components/AuthPage/AuthPage.js';
import CollapsibleTable from './components/adminPage/adminPage.js';

import GeneralInfoStyles from './components/HomePage/GeneralInfo.css';
import AboutMeStyles from './components/AboutMePage/AboutMe.css';
import ContactsStyles from './components/ContactsPage/Contacts.css';
import MessagesListStyles from './components/MessagesList/MessageList.css';
import HeaderStyles from './components/Header/Header.css';
import FooterStyles from './components/Footer/Footer.css';
import AutPageStyles from './components/AuthPage/AuthPage.css';
import adminPageStyles from './components/adminPage/adminPage.css';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <Routes>
            <Route path='/' element={<GeneralInfo />}/>
            <Route path='/about' element={<AboutMe />}/>
            <Route path='/contactus' element={<Contacts />}/>
            <Route path='/messages' element={user ? <MessagesList /> : <Navigate to="/" />} />
            <Route path='/authpage' element={user ? <Navigate to="/" /> : <AuthPage />} />
            <Route path='/admin' element={user ? <CollapsibleTable /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;