import './App.css';
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom'

import GeneralInfo from './components/HomePage/GeneralInfo';
import GeneralInfoStyles from './components/HomePage/GeneralInfo.css';
import AboutMe from './components/AboutMePage/AboutMe';
import AboutMeStyles from './components/AboutMePage/AboutMe.css';
import Contacts from './components/ContactsPage/Contacts';
import ContactsStyles from './components/ContactsPage/Contacts.css';
import MessagesList from './components/MessagesList/MessageList.js';
import MessagesListStyles from './components/MessagesList/MessageList.css';
import Header from './components/Header/Header';
import HeaderStyles from './components/Header/Header.css';
import Footer from './components/Footer/Footer';
import FooterStyles from './components/Footer/Footer.css';
import AuthPage from './components/AuthPage/AuthPage.js';
import AutPageStyles from './components/AuthPage/AuthPage.css'
import CollapsibleTable from './components/adminPage/adminPage.js';
import adminPageStyles from './components/adminPage/adminPage.css';

import { useAuthContext } from './hooks/useAuthContext.js';

function App() {
    const { user } = useAuthContext()

    return (
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<GeneralInfo />}/>
          <Route path='/about' element={<AboutMe />}/>
          <Route path='/contactus' element={<Contacts />}/>
          <Route path='/messages' element={user ? <MessagesList /> : <Navigate to="/" />} />
          <Route path='/authpage' element={user ? <Navigate to="/" /> : <AuthPage />} />
          <Route path='/admin' element={user ? <CollapsibleTable /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
  
  export default App;
  