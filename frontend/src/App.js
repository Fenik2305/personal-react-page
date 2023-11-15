import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import GeneralInfo from './components/HomePage/GeneralInfo';
import GeneralInfoStyles from './components/HomePage/GeneralInfo.css';
import AboutMe from './components/AboutMePage/AboutMe';
import AboutMeStyles from './components/AboutMePage/AboutMe.css';
import Contacts from './components/ContactsPage/Contacts';
import ContactsStyles from './components/ContactsPage/Contacts.css';
import Login from './components/Login/Login.js'
import LoginStyles from './components/Login/Login.css'
import Signup from './components/Signup/Signup.js'
import SignupStyles from './components/Signup/Signup.css'
import MessagesList from './components/MessagesList/MessageList.js';
import MessagesListStyles from './components/MessagesList/MessageList.css';
import Header from './components/Header/Header';
import HeaderStyles from './components/Header/Header.css';
import Footer from './components/Footer/Footer';
import FooterStyles from './components/Footer/Footer.css';

import AuthPage from './components/AuthPage/AuthPage.js';
import AutPageStyles from './components/AuthPage/AuthPage.css'

function App() {
    return (
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<GeneralInfo />}/>
          <Route path='/about' element={<AboutMe />}/>
          <Route path='/contactus' element={<Contacts />}/>
          {/*<Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>*/}
          <Route path='/messages' element={<MessagesList />}/>
          <Route path='/authpage' element={<AuthPage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
  
  export default App;
  