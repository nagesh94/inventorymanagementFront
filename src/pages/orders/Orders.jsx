import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import './orders.scss'
import { fetchOrderByCustomer, fetchOrderByUser } from './../../common/redux/orderSlice'
import { fetchCustomer } from '../../common/redux/customerSlice'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Orders = () => {

  const dispatch = useDispatch()
  const [select, setSelect] = useState(false)
  const [custom, setCustom] = useState('')
  const [count, setCount] = useState(0)
  const customerOrder = useSelector(state => state.order.dataCustomer)
  let userOrder = useSelector(state => state.order.dataUser)
  const [modal,setModal]=useState(false)
  const [productDetails,setProductDetails]=useState([])

 if(customerOrder)
 {
   userOrder=customerOrder
 }

  const allCustomers = useSelector(state => state.customer.data)
  console.log(customerOrder)
  console.log(userOrder)
  console.log(allCustomers)

  useEffect(() => {
    dispatch(fetchOrderByCustomer(custom))
    dispatch(fetchOrderByUser())
    dispatch(fetchCustomer())
  }, [dispatch, count])

  const selectHandler = (event) => {
    event.target.value == 'user' ? setSelect(false) : setSelect(true)
  }

  const customerHandler = (id) => {
    setCustom(id)
    setCount(count + 1)
  }
  
  const details=(data)=>{
    setProductDetails(data)
    setModal(true)
  }
  return (
    <div className='orders'>
      <div className='sidebar'>
        <Sidebar index={5} />
      </div>
      <div className="mainContainer">
        <div className="ordersMain">
          <div className="ordersImg">

            <img src="" alt="allorder" />
          </div>

          <div className="ordersHeading">
            <h1>all orders here</h1>
          </div>

          <div className="ordersFilter">
            <p>sort by</p>
            <select name="filter" onChange={selectHandler}>
              <option  >user</option>
              <option >customer</option>
            </select>
            {
              select && <select name="customer" onClick={(event) => customerHandler(event.target.value)} >
                {
                  allCustomers && allCustomers.map((item, index) => {
                    return <option key={index} value={item._id}>{item.name}</option>
                  })
                }
              </select>
            }
          </div>

          <div className="orderTable">
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">customer</TableCell>
                    <TableCell align="right">DateOfOrder</TableCell>
                    <TableCell align="right">totalAMount</TableCell>
                    <TableCell align="right">total product</TableCell>
                    <TableCell align="right">Details</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrder.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                     
                      <TableCell align="right">{row._id}</TableCell>
                      <TableCell align="right">{row.customer.name}</TableCell>
                      <TableCell align="right">{row.orderDate}</TableCell>
                      <TableCell align="right">{row.totalAmount}</TableCell>
                      <TableCell align="right">{row.productDetails.length}</TableCell>
                      <TableCell align="right"><button onClick={()=>details(row.productDetails)}>Details</button></TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {
            modal && <div className='modal' >
               <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">quantity</TableCell>
                    <TableCell align="right">amount</TableCell>
                   
                  
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productDetails.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                     
                      <TableCell align="right">{row._id}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.quant}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <button onClick={()=>setModal(false)}>X</button>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Orders