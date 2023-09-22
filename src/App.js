import './App.css';
import HeaderStyles from './components/header/Header.css'
import GeneralInfoStyles from './components/general-info/GeneralInfo.css'
import FooterStyles from './components/footer/Footer.css'
import Header from './components/header/Header';
import GeneralInfo from './components/general-info/GeneralInfo';
import Footer from './components/footer/Footer';

function App() {
    return (
      <div className="App">
        <Header />
        <GeneralInfo />
        <Footer />
      </div>
    );
  }
  
  export default App;
  