
import './App.css';
import './Header.css';
// import { useHistory } from 'react-router-dom';
import CivilizationParser from './CivilizationParser';
function App() {
  const imagePath = 'civ5_logo.png';
  // const history = useHistory();
  // const handleCivilizationsClick = () => {
  //     // При нажатии на "Цивилизации" перейти на страницу с компонентом CivilizationParser
  //     history.push('/civilizations');
  // };
  return (
    <div className="App">
        <div className="header">
            <div className="header-logo">
                <img className="header-logo headimgs" src={imagePath} alt="logo"/>
            </div>
            <input className="input-container" placeholder="Search..."></input>
        </div>
        <div className="content-block">
            <div className="content-block-blk">
                <h1 className="content-block-blk-text">Цивилизации</h1>
            </div>
            <div className="content-block-blk">
                <h1 className="content-block-blk-text">Юниты</h1>
            </div>
            <div className="content-block-blk">
                <h1 className="content-block-blk-text">Ресурсы</h1>
            </div>
            <div className="content-block-blk">
                <h1 className="content-block-blk-text">Местности</h1>
            </div>
            <div className="content-block-blk">
                <h1 className="content-block-blk-text">Здания</h1>
            </div>
            {/*<CivilizationParser />*/}
        </div>
    </div>
  );
}

export default App;
