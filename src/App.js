import './style/App.css';
import './style/Header.css';
import './style/Footer.css';
import {Theme,presetGpnDefault} from "@consta/uikit/Theme";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Content from "./components/Content";
import CivPage from "./pages/CivPage";
import UnitPage from "./pages/UnitPage";
import ResourcePage from "./pages/ResourcePage";
import BuildingPage from "./pages/BuildingPage";
import TechPage from "./pages/TechPage";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
        <Theme preset={presetGpnDefault}>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Content/>} />
                <Route path="/civpage" element={<CivPage/>}/>
                <Route path="/unitpage" element={<UnitPage/>}/>
                <Route path="/resourcepage" element={<ResourcePage/>}/>
                <Route path="/techpage" element={<TechPage/>}/>
                <Route path="/buildingpage" element={<BuildingPage/>}/>
            </Routes>
            <Footer />
        </Router>
        </Theme>
    </div>
  );
}

export default App;
