import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import './sell.scss'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckOut from '../checkOut/CheckOut';
import { deleteCart } from '../../common/redux/sellSlice';

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

const Sell = () => {

  const dispatch=useDispatch()
  const val=useSelector(state=>state.sell.data)
  const [index,setIndex]=useState()
  const [count,setCount]=useState(0)
  // const ind=useSelector(state=>state.sell.index)
console.log(val)
 
  
  const [modal,setModal]=useState(false)

  useEffect(()=>{
  },[count])
  
  const modalHandler=(data)=>{
    setModal(data)
  }
  const removeItem=(index)=>{
    setIndex(index)
    dispatch(deleteCart(index))
    setCount(count+1)
  }

  const totalAmount=val.reduce((current,next)=>{
    return current+(next.price)*(next.quant*1)
  },0)

  

  


  console.log(totalAmount)
  return (
    <div className='sell'>
    <div className='sidebar'>
      <Sidebar index={2} />
    </div>
    <div className="mainContainer">
      <div className="sellMain">
        <div className="sellImg">
          <img style={{width:"200%", height:"200%"}} src="https://tse1.mm.bing.net/th?id=OIP.VFlJMEpVTkQGAB5nUnZqUAHaFB&pid=Api&P=0&w=238&h=161" alt="sell" />
        </div>
        <div className="sellHeading">
          <p>CART</p>
        </div>
        <div className="sellCart">
        <TableContainer component={Paper}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow className='bold'>
                    
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">Supplier</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">Color</StyledTableCell>
                    <StyledTableCell align="center">Size</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">remove</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {val.map((row, index) => (
                    <StyledTableRow
                      key={row._id}
                    >
                     
                      <StyledTableCell align="center">{row.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                      
                      <StyledTableCell align="center">{row.category}</StyledTableCell>
                      <StyledTableCell align="center">{row.supplier}</StyledTableCell>
                      <StyledTableCell align="center">{row.brand}</StyledTableCell>
                      <StyledTableCell align="center">{row.color}</StyledTableCell>
                      <StyledTableCell align="center">{row.size}</StyledTableCell>
                      <StyledTableCell align="center">{row.quant}</StyledTableCell>
                      <StyledTableCell align="center"><button className='button' onClick={()=>removeItem(index)}>remove</button></StyledTableCell>

                      
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>

        <div className='totalAmount'>
                <h1>{`Total Amount = ${totalAmount}`}</h1>
        </div>

        <div className="checkOut">
         { totalAmount>0 && <button className='button' onClick={()=>setModal(true)}>Checkout</button>}
        </div>
        
        {
          modal && <CheckOut close={modalHandler} totalAmount={totalAmount} data={val}/>
        }



      </div>
    </div>
  </div>
  )
}

export default Sell