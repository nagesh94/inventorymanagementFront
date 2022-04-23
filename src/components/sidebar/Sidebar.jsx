import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {MdLogout} from 'react-icons/md';

import './sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import category from '../../utils/category/category';

const Sidebar = ({index}) => {

  const [user,setUser]=useState("")
  const navigate=useNavigate()
  const [selected,setSelected]=useState(index)
  
  console.log(user)

  const func=()=>{
    setSelected(index)
    
  }


  useEffect( ()=>{
   return async ()=>{
    try {
      const url='http://localhost:8000/api/v1/users/as4df4sad5f45asd4f/'
      const token=localStorage.getItem('token')
      const response=await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
    
      setUser(response.data.data.firstname)
    } catch (err) {
      console.log(err.response)
    }
   }
  },)
  console.log("hello")

  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <div className='sidebar'>

      <div className='sidebar_name'>
        <p className='sidebar_name_heading'>WELCOME </p>
        <p className='sidebar_name_user'>{user}</p>
      </div>

      <hr />
      <div className="sidebar_category">

       {
         category.map((item,index)=>{
           return (
             <Link to={item.link} style={{textDecoration:"none"}}><div className={selected==index ? "category active":"category"} key={index}
             onClick={func}>
               {item.icons}
               
               <span>{item.heading}</span>
             </div>
             </Link>
           )
         })
       }
        
        <div className="category">
          <MdLogout className='icons'/>
          <button onClick={logout} className="logout">LOGOUT</button>
        </div>

      </div>
      
    </div>
  )
}

export default Sidebar