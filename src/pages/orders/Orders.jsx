import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import './orders.scss'
import { fetchOrderByCustomer, fetchOrderByUser } from './../../common/redux/orderSlice'
import { fetchCustomer } from '../../common/redux/customerSlice'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Orders = () => {

  const dispatch = useDispatch()
  const [select, setSelect] = useState(false)
  const [custom, setCustom] = useState('')
  const [count, setCount] = useState(0)
  let customerOrder = useSelector(state => state.order.dataCustomer)
  let userOrder = useSelector(state => state.order.dataUser)
  const proxyUser=[...userOrder]
  const [modal,setModal]=useState(false)
  const [productDetails,setProductDetails]=useState([])

 if(customerOrder)
 {
   userOrder=customerOrder
 }
  const allCustomers = useSelector(state => state.customer.data)


  useEffect(() => {
    dispatch(fetchOrderByCustomer(custom))
    dispatch(fetchOrderByUser())
    dispatch(fetchCustomer())
  }, [dispatch, count])

  console.log(userOrder)
  const selectHandler = (event) => {
    
  
   
    if( event.target.value == 'User'){
      setSelect(false)
      setCustom('')
      setCount(count+1)
    }else{
      setSelect(true)
    }
  }
   
  console.log(select)
  const customerHandler = (id) => {
    setCustom(id)
    setCount(count + 1)
  }
  
  const details=(data)=>{
    setProductDetails(data)
    setModal(true)
  }

  console.log(modal)
  return (
    <div className='orders'>
      <div className='sidebar'>
        <Sidebar index={5} />
      </div>
      <div className="mainContainer">
        <div className="ordersMain">
          <div className="ordersImg">

            <img  style={{width:"40%", height:"40%"}} src="https://images.unsplash.com/photo-1613652038578-a9a988b54a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="allorder" />
          </div>

          <div className="ordersHeading">
            <p>ORDERS LIST</p>
          </div>

          <div className="ordersFilter">
            <p>SORT BY</p>
            <select name="filter" onChange={selectHandler}>
              <option  >User</option>
              <option >Customer</option>
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
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">id</StyledTableCell>
                    <StyledTableCell align="center">Customer</StyledTableCell>
                    <StyledTableCell align="center">Date Of Order</StyledTableCell>
                    <StyledTableCell align="right">Total AMount</StyledTableCell>
                    <StyledTableCell align="right">Total product</StyledTableCell>
                    <StyledTableCell align="center">Details</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrder.map((row) => (
                    <StyledTableRow
                      key={row._id}
                    >
                     
                      <StyledTableCell align="center">{row._id}</StyledTableCell>
                      <StyledTableCell align="center">{row.customer.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.orderDate}</StyledTableCell>
                      <StyledTableCell align="center">{row.totalAmount}</StyledTableCell>
                      <StyledTableCell align="center">{row.productDetails.length}</StyledTableCell>
                      <StyledTableCell align="center"><button className='details' onClick={()=>details(row.productDetails)}>Details</button></StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {
            modal && <div className='modal' >
                <div >
               <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">id</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                   
                  
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productDetails.map((row) => (
                    <StyledTableRow
                      key={row._id}
                    >
                     
                      <StyledTableCell align="center">{row._id}</StyledTableCell>
                      <StyledTableCell align="center">{row.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.quant}</StyledTableCell>
                      <StyledTableCell align="center">{row.amount}</StyledTableCell>
                
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <button className='button' onClick={()=>setModal(false)}>X</button>
            </div>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Orders