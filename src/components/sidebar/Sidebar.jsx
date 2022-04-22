import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDashboard,MdSell,MdLogout,MdPeopleAlt,MdShoppingCart,MdProductionQuantityLimits,MdSettings } from 'react-icons/md';
import { GrOrganization} from 'react-icons/gr';
import { BsLayoutThreeColumns} from 'react-icons/bs';
import { BiPurchaseTag} from 'react-icons/bi';
import './sidebar.scss'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const [user,setUser]=useState("")
  const navigate=useNavigate()

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
  },[])

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

        <div className="category">
          <MdDashboard className='icons'/>
          <p>DASHBOARD</p>
        </div>
        <div className="category">
          <BiPurchaseTag className='icons'/>
          <p>PURCHASE</p>
        </div>
        <div className="category">
          <MdSell className='icons'/>
          <p>SELL</p>
        </div>
        <div className="category">
          <MdPeopleAlt className='icons'/>
          <p>CUSTOMER</p>
        </div>
        <div className="category">
          <GrOrganization className='icons'/>
          <p>SUPPLIER</p>
        </div>
        <div className="category">
          <MdShoppingCart className='icons'/>
          <p>ORDERS</p>
        </div>
        
        <div className="category">
          <BsLayoutThreeColumns className='icons'/>
          <p>ATTRIBUTES</p>
        </div>
        <div className="category">
          <MdProductionQuantityLimits className='icons'/>
          <p>PRODUCT</p>
        </div>
        <div className="category">
          <MdSettings className='icons'/>
          <p>SETTING</p>
        </div>
        <div className="category">
          <MdLogout className='icons'/>
          <button onClick={logout} className="logout">LOGOUT</button>
        </div>

      </div>
      
    </div>
  )
}

export default Sidebar