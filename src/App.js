import './App.css';
import MyHeader from './components/header/MyHeader';
import Description from './components/general_info/Decription';
import Image from './components/general_info/Image';
import MyFooter from './components/footer/MyFooter';

function App() {
  return (
    <div className="App">
      <MyHeader />

      <div className="App-GeneralInfo">
        <Description />
        <Image />
      </div>
      
      <MyFooter />
    </div>
  );
}

export default App;
