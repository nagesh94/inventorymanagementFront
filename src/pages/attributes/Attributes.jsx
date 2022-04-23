import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './attributes.scss'

const Attributes = () => {
  return (
    <div className='attribute'>
    <div className='sidebar'>
      <Sidebar index={6}/>
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

export default Attributes