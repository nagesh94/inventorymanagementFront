

import './login.scss'
import Mainfile from "../../utils/particle/Mainfile";
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate()
  const [sign, setSign] = useState({
    email: "",
    password: ""
  })
  const handleChange = (event) => {
    setSign({ ...sign, [event.target.name]: event.target.value })
  }

  const loginUser = async () => {
    try {
      const url='http://localhost:8000/api/v1/users/login/'
      const response=await axios.post(url,sign)
     
      localStorage.setItem("token",response.data.token)
      navigate('/home')
    } catch (err) {
      console.log(err.response)
    }
  }

  return (


    <>

      <Mainfile />
      <motion.div className="login"
       initial={{height:0}}
       animate={{height:"100%"}}
       exit={{height:window.innerHeight}}>

        <div className="login_input">
          <p className="login_heading">WELCOME TO INVENTOSHOP</p>
          <div className="login_input_input">

            <input type="email" name="email" placeholder='email' value={sign.email} onChange={handleChange} />
          </div>
          <div className="login_input_input">

            <input type="password" name="password" placeholder='password' value={sign.password} onChange={handleChange} />

          </div>
          <div  >
            <button className='button' onClick={loginUser}>LOGIN</button>
          </div>
          <div className="login_forgetPass">
            <Link to='/forget'><p > forget password ?</p></Link>
            
          </div>



          <div className='login_signup'>
            <p >Not a member yet?</p>
            <Link to='/signup'> <button className='button '>SIGNUP</button></Link>
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login 