import React, { useRef, useState } from 'react'
import './signup.scss'
import Mainfile from "../../utils/particle/Mainfile";
import { useForm } from 'react-hook-form';
// import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {

  const { formState: { errors }, register, handleSubmit } = useForm();
  const [DOB, setDOB] = useState()
  const ref = useRef()
  const navigate=useNavigate()
  const [error,setError]=useState('')


  const submit = async (data) => {
    data = { ...data, "DOB": DOB }
    try {
      const url = 'http://localhost:8000/api/v1/users/signup/'
      const response = await axios.post(url, data)
      
      navigate('/')
      
    } catch (err) {
      setError(err.response.data.message)
      console.log(err.response)
    }
  }
  const setdate = (event) => {
    setDOB(event.target.value)
  }
  console.log(DOB)
  // const country=Country.getAllCountries()
  // const state=State.get
  // const city=City.getCitiesOfState()

  return (
    <>
      <Mainfile style={{height:"100vh"}} />
      <motion.div className="signup"
       initial={{height:0}}
       animate={{height:"100%"}}
       exit={{height:window.innerHeight}}>
        <div className="signup_here">

          <p className='signup_heading'>SIGNUP HERE</p>
          {error && <p style={{color:"red"}}>{error}</p>}
          <form ref={ref} onSubmit={handleSubmit(submit)} className="signup_form">
            <input {...register("firstname", { required: true, maxLength: 20 })} placeholder="FIRSTNAME"/>
            {errors.firstname?.type === 'required' && "First name is required"}

            <input {...register("lastname", { required: true, maxLength: 20 })} placeholder="LASTNAME"/>
            {errors.lastname?.type === 'required' && "last name is required"}

            <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ })} placeholder="EMAIL"/>
            {errors.email?.type === 'required' && "email is required"}
            {errors.email?.type === 'pattern' && "not valid email address"}

            <input {...register("password", { required: true, minLength: 8 })} placeholder="PASSWORD" />
            {errors.password?.type === 'required' && "password is required"}
            {errors.password?.type === 'minLength' && "password should be atleadt 8 character long"}

            <input {...register("confirmPassword", { required: true, })}  placeholder="CONFIRM PASSWORD"/>
            {errors.confirmPassword?.type === 'required' && "password is required"}


            <input {...register("company", { required: true, })} placeholder="COMPANY" />
            {errors.company?.type === 'required' && "company is required"}

            <select {...register("gender", { required: true, })}  >

              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {errors.gender?.type === 'required' && "please provide gender"}

            <input {...register("address", { required: true, minLength: 15 })} placeholder="ADDRESS"/>
            {errors.address?.type === 'required' && "address is required"}
            {errors.address?.type === 'minLenth' && "address should be greater than 15 character"}

              <div>
            <label htmlFor="dob">BIRTH</label>
            <input type='date' required onChange={setdate} name="dob" />

              </div>


            <button type='submit' className='button'>SIGNUP</button>
















          </form>



        </div>
      </motion.div>
    </>
  )
}

export default Signup