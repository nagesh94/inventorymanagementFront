import React from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const Home = () => {
  return (
    <div className='home'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className="mainContainer">
        <div className="navbar">
         <Navbar/>
        </div>
        <div className="main">
          56465464654
        </div>
      </div>
    </div>
  )
}

export default Home