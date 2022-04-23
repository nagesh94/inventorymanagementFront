
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { AnimatePresence } from 'framer-motion'
import ForgetPassword from './pages/forgetpassword/ForgetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Purchase from './pages/purchase/Purchase';
import Customer from './pages/Customer/Customer';
import Suppliers from './pages/suppliers/Suppliers';
import Attributes from './pages/attributes/Attributes';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/supplier' element={<Suppliers/>}/>
          <Route path='/attribute' element={<Attributes/>}/>
          {/* <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/purchase' element={<Purchase/>}/> */}
        </Routes>
      </AnimatePresence>

    </div >
  );
}

export default App;
