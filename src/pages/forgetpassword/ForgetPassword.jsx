import React, { useRef, useState } from 'react'
import './forgetPassword.scss'
import Mainfile from '../../utils/particle/Mainfile'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';


const ForgetPassword = () => {
    const { formState: { errors }, register, handleSubmit } = useForm();
    const ref=useRef()
    const navigate=useNavigate()
    const [error,setError]=useState('')
    
    const submit = async (data) => {
        
        try {
          const url = 'http://localhost:8000/api/v1/users/forgetpassword/'
          const response = await axios.post(url, data)
          console.log(response)
          navigate('/resetpass')
          
        } catch (err) {
          setError(err.response.data.message)
          console.log(err.response)
        }
      }
  return (
      <>
      <Mainfile/>
    <motion.div className='forget' 
     initial={{height:0}}
     animate={{height:"100%"}}
     exit={{height:window.innerHeight}}>
        <form className='forget_box' ref={ref} onSubmit={handleSubmit(submit)}>
            <h1>Please provide the register email address</h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ })} placeholder='Enter your register email address'/>
            {errors.email?.type === 'required' && "email is required"}
            {errors.email?.type === 'pattern' && "not valid email address"}
            <button className='button'>Send Link</button>
        </form>
    </motion.div>
      </>
  )
}

export default ForgetPassword