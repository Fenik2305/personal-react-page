import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import AboutMePage from './components/AboutMePage/AboutMePage';
import ContactsPage from './components/ContactsPage/ContactsPage';

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
  