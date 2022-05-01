import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {MdLogout} from 'react-icons/md';

import './sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import category from '../../utils/category/category';
import { useDispatch, useSelector } from 'react-redux';
import { fetchsidebar } from '../../common/redux/supplierSlice';

const Sidebar = ({index}) => {

  const [user,setUser]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [selected,setSelected]=useState(index)
  const val=useSelector(state=>state.supplier.sidebarName)
  


  const func=()=>{
    setSelected(index)
    
  }


  useEffect( ()=>{
   dispatch(fetchsidebar())
   setUser(val)
  },[dispatch])

  useEffect( ()=>{
   dispatch(fetchsidebar())
   setUser(val)
  },[val])
 
 

  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <div className='sidebar'>

      <div className='sidebar_name'>
        <p className='sidebar_name_heading'>WELCOME</p>
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