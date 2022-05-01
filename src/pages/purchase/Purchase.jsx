import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchBrand, fetchCategory, fetchColor, fetchSize } from '../../common/redux/attributeSlice'
import { fetchSupplier } from '../../common/redux/supplierSlice'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './purchase.scss'

const Purchase = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const colorVal=useSelector(state=>state.attribute.color)
  const categoryVal=useSelector(state=>state.attribute.category)
  const sizeVal=useSelector(state=>state.attribute.size)
  const brandVal=useSelector(state=>state.attribute.brand)
  const supplierVal = useSelector((state) => state.supplier.data)
  const [count,setCount]=useState(0)
  console.log(supplierVal)

  const [data,setData]=useState({
    name:'',
    supplier:'',
    price:"",
    category:"",
    size:"",
    brand:"",
    color:"",
    quantity:''
  })

  
  useEffect(()=>
  {
    dispatch(fetchColor())
    dispatch(fetchCategory())
    dispatch(fetchSize())
    dispatch(fetchSupplier())
    dispatch(fetchBrand())
  },[dispatch,count])
  
  const handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  console.log(data)


  const addProduct=async () => {
    try {
      const url = 'http://localhost:8000/api/v1/products/'
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

     navigate('/product')
     setData({})
      
    } catch (err) {
      console.log(err.response)
    }
  }
  return (
    <div className='purchase'>
      <div className='sidebar'>
        <Sidebar index={1} />
      </div>
      <div className="mainContainer purchaseContainer">
      <div className="purchaseImg">
          <img src="https://tse1.mm.bing.net/th?id=OIP.h2ZvmcWjUWd79cphtKn64AHaHa&pid=Api&P=0&w=203&h=203" alt="purchase" />
          </div>
        
        <div className="purchaseMain">
        
        <div className="purchaseProduct">
        <div className="purchaseHeading">
          <p>Add your product !</p>
        </div>
          <input type="text" name='name' placeholder='Product Name'  onChange={handleChange} />
          <input type="number" name='price' placeholder='Price' onChange={handleChange}  />
          <input type="number" name='quantity' placeholder='Quantity' onChange={handleChange}  />
          
          <select name="supplier" onChange={handleChange} >
            <option value=''>Supplier</option>
            {
              supplierVal.map((item,index)=>{
                return <option>{item.name}</option>
              })
            }
          </select>
          
          
          <select name="category" onChange={handleChange} >
          <option value=''>Category</option>
            {
              categoryVal.map((item,index)=>{
                return <option>{item.name}</option>
              })
            }
          </select>

          <select name="brand" onChange={handleChange} >
          <option value=''>Brand</option>
            {
              brandVal.map((item,index)=>{
                return <option>{item.name}</option>
              })
            }
          </select>
          <select name="size" onChange={handleChange} >
          <option value=''>Size</option>
            {
              sizeVal.map((item,index)=>{
                return <option>{item.size}</option>
              })
            }
          </select>
          <select name="color" onChange={handleChange}  placeholder="color">
          <option  value="" >Color</option>
            {
              colorVal.map((item,index)=>{
                return <option>{item.color}</option>
              })
            }
          </select>
          <br/>

          <button onClick={addProduct}>Add Product</button>



          </div>

        </div>
       
          
        
        
     
      </div>
    </div>
  )
}

export default Purchase