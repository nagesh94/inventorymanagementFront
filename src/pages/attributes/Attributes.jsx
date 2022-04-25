import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './attributes.scss'
import AttributeCard from '../../components/attributeCard/AttributeCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrand, fetchCategory, fetchColor, fetchSize } from '../../common/redux/attributeSlice'

const Attributes = () => {

  const dispatch=useDispatch()
  const [color,setColor]=useState([]) 
  const [category,setCategory]=useState([]) 
  const [size,setSize]=useState([]) 
  const [brand,setBrand]=useState([])
  const colorVal=useSelector(state=>state.attribute.color)
  const categoryVal=useSelector(state=>state.attribute.category)
  const sizeVal=useSelector(state=>state.attribute.size)
  const brandVal=useSelector(state=>state.attribute.brand)
  
  useEffect(()=>
  {
    dispatch(fetchColor())
    dispatch(fetchCategory())
    dispatch(fetchSize())
    dispatch(fetchBrand())
  },[dispatch])
  useEffect(()=>{
    
    setColor(colorVal)
    setCategory(categoryVal)
    setSize(sizeVal)
    setBrand(brandVal)
  },[colorVal,categoryVal,sizeVal,brandVal])

  

  return (
    <div className='attribute'>
      <div className='sidebar'>
        <Sidebar index={6} />
      </div>
      <div className="mainContainer">

        <div className="attributeMain">
          <Grid container  className='gridContainer' >
            
           <AttributeCard attribute="color" list={color} val='colors' />
           <AttributeCard attribute="name" list={category} val='categories' />
           <AttributeCard attribute="size" list={size} val='sizes' />
           <AttributeCard attribute="name" list={brand} val='brands' />
            
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Attributes