import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Mainfile from "../../utils/particle/Mainfile";
import './resetpass.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {

    const navigate=useNavigate()
    const [token,setToken]=useState('')
    const [input,setInput]=useState({
        password:'',
        confirmPassword:''
    })
    const [error,setError]=useState('')

    const resetKey=(event)=>{
        setToken(event.target.value)
    }
    const changeHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }

    const resetPass=async ()=>{
        try {
            const url=`http://localhost:8000/api/v1/users/resetpassword/${token}/`
            const response=await axios.post(url,input)
            navigate('/')
        } catch (err) {
            setError(err.response.data.message)
        }
    }
   
  return (
    <>

    <Mainfile />
    <motion.div className="reset"
     initial={{height:0}}
     animate={{height:"100%"}}
     exit={{height:window.innerHeight}}>

      <div className="reset_input">
        <p className="login_heading">RESET HERE</p>
        {error && <p style={{color:"red"}}>{error}</p>}

        <input type="text" name="token" placeholder='token here' onChange={resetKey} />
        <input type="text" name='password'  placeholder='new password' onChange={changeHandler}/>
        <input type="text" name='confirmPassword' placeholder='confirm password' onChange={changeHandler} />
        <button className='button' onClick={resetPass}>RESET</button>
        



        
      </div>
    </motion.div>
  </>
  )
}

export default ResetPass