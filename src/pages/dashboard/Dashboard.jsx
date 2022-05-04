import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderByUser } from '../../common/redux/orderSlice'
import { fetchProductAll } from '../../common/redux/productSlice'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './dashboard.scss'
const Dashboard = () => {

  const dispatch=useDispatch()
  const orderData=useSelector(state=>state.order.dataUser)
  const productData=useSelector(state=>state.product.allData)
  console.log(orderData)
  console.log(productData)

  const productAmt= productData.reduce((acc,current)=>{
    return acc + current.price
    // return acc.price*acc.quantity+current.price*current.quantity
  },0)
  const orderAmt=orderData.reduce((acc,current)=>{
    return acc+current.totalAmount
  },0)
  console.log(productAmt)
  console.log(orderAmt)

  

  useEffect(()=>
  {
    dispatch(fetchOrderByUser())
    dispatch(fetchProductAll())
  },[dispatch])
  return (
    <div className='dashboard'>
        <div className='purchaseAmt'>
          <h2>TOTAL PURCHASE</h2>
          <h1>${productAmt}</h1>
        </div>
        <div className="sellAmt">
        <h2>TOTAL SELL</h2>
          <h1>${orderAmt}</h1>
        </div>
    </div>
  )
}

export default Dashboard