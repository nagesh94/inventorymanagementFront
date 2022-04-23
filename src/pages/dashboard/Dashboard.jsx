import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './dashboard.scss'
const Dashboard = () => {
  return (
    <div>
        <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className="mainContainer">
        <div className="navbar">
         <Navbar/>
        </div>
        <div className="main">
            dashboard
        </div>
      </div>
    </div>
  )
}

export default Dashboard