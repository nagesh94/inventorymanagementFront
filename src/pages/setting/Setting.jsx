import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './setting.scss'

import { useDispatch, useSelector } from 'react-redux';
import  { fetchUser } from '../../common/redux/userSlice';
import axios from 'axios';

const Setting = () => {


  const dispatch=useDispatch()
  const [data,setData]=useState({})
  const val=useSelector(state=>state.user.data)
  const [modal,setModal]=useState(false)
  
  useEffect(()=>
  {
    dispatch(fetchUser())
  },[dispatch])
  
  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  console.log(data)

const updatePassword= async () => {
  try {
    
    const url = 'http://localhost:8000/api/v1/users/updatepassword/'
    const token = localStorage.getItem('token')
  
    const response = await axios.post(url, data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
      

    })
   
    console.log(response) 
    setModal(false)
    
    
  } catch (err) {
    console.log(err.response)
  }
}
  
  return (
    <div className='setting'>
    <div className='sidebar'>
      <Sidebar index={8} />
    </div>
    <div className="mainContainer">
      <div className="setting_main">
        {
          modal && <div>
            <input type="text" placeholder='current Password' onChange={changeHandler} name='password' />
            <input type="text" placeholder='new Password' onChange={changeHandler} name='newPassword' />
            <input type="text" placeholder=' confirm Password' onChange={changeHandler} name='confirmPassword' />
            <button onClick={updatePassword}>update</button>
          </div>
        }
            <button onClick={()=>setModal(true)} >update pass</button>
      </div>
    </div>
  </div>
  )
}

export default Setting