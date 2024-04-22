
import './App.css';
import './Header.css';
import axios from 'axios';
import CivilizationParser from './CivilizationParser';
function App() {
  const imagePath = 'civ5_logo.png';
  return (
    <div className="App">
        <div className="header">
            <div className="header-logo">
                <img className="header-logo headimgs" src={imagePath} alt="logo"/>
            </div>
            <input className="input-container" placeholder="Search..."></input>
        </div>
        <div className="content-block">
            <CivilizationParser />
        </div>
    </div>
  );
}

export default App;
