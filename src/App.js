
import './App.css';
import './Header.css';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import Content from "./components/Content";
function App() {

  return (

    <div className="App">
        <Header />
        <Content />
        {/*<Routes>*/}
        {/*    <Route path="/civpage" element={<CivPage/>} />*/}
        {/*</Routes>*/}
    </div>
  );
}

export default App;
