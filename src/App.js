import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
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
    const [messages, setMessages] = useState([]);
    
    return (
      <div className='App'>
        <Header messagesNum={messages.length}/>
        <Routes>
          <Route path='/' element={<GeneralInfo />}/>
          <Route path='/about' element={<AboutMe />}/>
          <Route path='/contactus' element={<Contacts messages={messages} onNewMessage={setMessages} />}/>
        </Routes>
        <Footer />
      </div>
    );
  }
  
  export default App;
  