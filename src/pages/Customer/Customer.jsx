import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './customer.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../common/redux/customerSlice';

const Customer = () => {

  const [data,setData]=useState([])
  const dispatch=useDispatch()
const val=useSelector(state=>state.customer.data)
console.log(val)

useEffect(()=>
{
  dispatch(fetchCustomer())
},[dispatch])
useEffect(()=>{
  
  setData(val)
},[val])




  return (
    <div className='customer'>
      <div className='sidebar'>
        <Sidebar index={3} />
      </div> 
      <div className="mainContainer">
        <div className="customer_main">
          
        <div className="customer_img">
          <img src="" alt="customer" />
        </div>
        <div className="customer_heading">
          <p>customer Details</p>
        </div>
        <div className="customer_table">
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">phone</TableCell>
                    <TableCell align="right">Email</TableCell>
                    
                    <TableCell align="right">orders</TableCell>
                    <TableCell align="right">status</TableCell>
                    
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right"><button>orders</button></TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      
                    </TableRow>
                   

                  ))}

                </TableBody>
              </Table>
            </TableContainer>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Customer