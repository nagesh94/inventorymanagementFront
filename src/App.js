
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Mainfile from "./utils/particle/Mainfile";

function App() {
  return (
    <div className="App">
      {/* <Mainfile/> */}
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          
      </Routes>
    </div>
  );
}

export default App;
