import './App.css';
import Dropdown from './components/Dropdown/Dropdown';
import Navbar from './components/Navbar';
import Separation from './components/Separation';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Separation/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
