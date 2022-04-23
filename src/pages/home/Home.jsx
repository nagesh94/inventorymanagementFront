import React from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Dashboard from '../dashboard/Dashboard'
import Purchase from '../purchase/Purchase'
import { Route, Routes } from 'react-router-dom'
import Suppliers from '../suppliers/Suppliers'

const Home = () => {
  return (
    <div className='home'>
   
      <div className='sidebar'>
      <Sidebar index={0}/>
       
        
      </div>
      <div className="mainContainer">
        <div className="navbar">
         <Navbar/>
        </div>
        <div className="main">
        
        </div>
      </div>
      </div>
      
  
  )
}

export default Home