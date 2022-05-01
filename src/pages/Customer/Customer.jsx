import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './customer.scss'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../common/redux/customerSlice';


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
          <img src="https://tse2.mm.bing.net/th?id=OIP.Lxp3fNGBujcoOXLsU_0mTwHaFc&pid=Api&P=0&w=209&h=153" alt="customer" />
        </div>
        <div className="customer_heading">
          <p>Customer Details</p>
        </div>
        <div className="customer_table">
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Phone</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                        {/*<TableCell align="right">orders</TableCell> */}
                    <StyledTableCell align="center">Status</StyledTableCell>
                    
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <StyledTableRow 
                      key={row._id}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.phone}</StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      {/* <TableCell align="right"><button>orders</button></TableCell> */}
                      <StyledTableCell align="center">{row.status}</StyledTableCell>
                      
                    </StyledTableRow>
                   

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