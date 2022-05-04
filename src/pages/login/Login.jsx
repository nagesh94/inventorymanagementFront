

import './login.scss'
import Mainfile from "../../utils/particle/Mainfile";
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate()
  const [error,setError]=useState('')
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
      setError(err.response.data.message)
      console.log(error)
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
            {error && <h1 style={{color:"red"}}>{error}</h1>}
          <div className="login_input_input">
            <input type="email" name="email" placeholder='Email' value={sign.email} onChange={handleChange} />
          </div>
          <div className="login_input_input">

            <input type="password" name="password" placeholder='Password' value={sign.password} onChange={handleChange} />

          </div>
          <div  >
            <button className='button' onClick={loginUser}>LOGIN</button>
          </div>
          <div className="login_forgetPass">
            <Link to='/forget'><p> Forget Password ?</p></Link>
            
          </div>



          <div className='login_signup'>
            <p>Don't have an account ?</p>
            <Link to='/signup'> <button className='button '>SIGNUP</button></Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login 