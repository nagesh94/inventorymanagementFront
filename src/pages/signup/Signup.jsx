import React, { useRef, useState } from 'react'
import './signup.scss'
import Mainfile from "../../utils/particle/Mainfile";
import { useForm } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const { formState: { errors }, register, handleSubmit } = useForm();
  const [DOB, setDOB] = useState()
  const ref = useRef()
  const navigate=useNavigate()


  const submit = async (data) => {
    data = { ...data, "DOB": DOB }
    try {
      const url = 'http://localhost:8000/api/v1/users/signup/'
      const response = await axios.post(url, data)
      
      navigate('/')
      
    } catch (err) {
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
      <Mainfile />
      <div className="signup">
        <div className="signup_here">

          <p className='signup_heading'>signup herew</p>
          <form ref={ref} onSubmit={handleSubmit(submit)} className="signup_form">
            <input {...register("firstname", { required: true, maxLength: 20 })} />
            {errors.firstname?.type === 'required' && "First name is required"}

            <input {...register("lastname", { required: true, maxLength: 20 })} />
            {errors.lastname?.type === 'required' && "last name is required"}

            <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ })} />
            {errors.email?.type === 'required' && "email is required"}
            {errors.email?.type === 'pattern' && "not valid email address"}

            <input {...register("password", { required: true, minLength: 8 })} />
            {errors.password?.type === 'required' && "password is required"}
            {errors.password?.type === 'minLength' && "password should be atleadt 8 character long"}

            <input {...register("confirmPassword", { required: true, })} />
            {errors.confirmPassword?.type === 'required' && "password is required"}


            <input {...register("company", { required: true, })} />
            {errors.company?.type === 'required' && "company is required"}

            <select {...register("gender", { required: true, })} >

              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {errors.gender?.type === 'required' && "please provide gender"}

            <input {...register("address", { required: true, minLength: 15 })} />
            {errors.address?.type === 'required' && "address is required"}
            {errors.address?.type === 'minLenth' && "address should be greater than 15 character"}

            <input type='date' required onChange={setdate} />


            <button type='submit'>signup</button>
















          </form>



        </div>
      </div>
    </>
  )
}

export default Signup