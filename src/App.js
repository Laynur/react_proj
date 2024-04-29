
import './App.css';
import './Header.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import Content from "./components/Content";
import CivPage from "./pages/CivPage";
import UnitPage from "./pages/UnitPage";
function App() {

  return (

    <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Content/>} />
                <Route path="/civpage" element={<CivPage/>}/>
                <Route path="/unitpage" element={<UnitPage/>}/>
            </Routes>


        </Router>

        {/*<Routes>*/}
        {/*    <Route path="/civpage" element={<CivPage/>} />*/}
        {/*</Routes>*/}
    </div>
  );
}

export default App;
