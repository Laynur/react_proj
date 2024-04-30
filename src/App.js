
import './App.css';
import './Header.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import Content from "./components/Content";
import CivPage from "./pages/CivPage";
import UnitPage from "./pages/UnitPage";
import ResourcePage from "./pages/ResourcePage";
import BuildingPage from "./pages/BuildingPage";
function App() {

  return (

    <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Content/>} />
                <Route path="/civpage" element={<CivPage/>}/>
                <Route path="/unitpage" element={<UnitPage/>}/>
                <Route path="/resourcepage" element={<ResourcePage/>}/>
                <Route path="/buildingpage" element={<BuildingPage/>}/>
            </Routes>


        </Router>
    </div>
  );
}

export default App;
