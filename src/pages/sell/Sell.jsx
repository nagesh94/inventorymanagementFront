import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import './sell.scss'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckOut from '../checkOut/CheckOut';

const Sell = () => {

  const dispatch=useDispatch()
  const val=useSelector(state=>state.sell.data)
 
  const [modal,setModal]=useState(false)

  const modalHandler=(data)=>{
    setModal(data)
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
          <img src="" alt="sell" />
        </div>
        <div className="sellHeading">
          <p>checkOut session</p>
        </div>
        <div className="sellCart">
        <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">price</TableCell>
                    <TableCell align="right">total quantity</TableCell>
                    <TableCell align="right">category</TableCell>
                    <TableCell align="right">supplier</TableCell>
                    <TableCell align="right">brand</TableCell>
                    <TableCell align="right">color</TableCell>
                    <TableCell align="right">size</TableCell>
                    <TableCell align="right">selected quant</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {val.map((row, index) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                     
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.supplier}</TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">{row.color}</TableCell>
                      <TableCell align="right">{row.size}</TableCell>
                      <TableCell align="right">{row.quant}</TableCell>

                      
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>

        <div className='totalAmount'>
                <h1>{`total AMount=${totalAmount}`}</h1>
        </div>

        <div className="checkOut">
          <button className='button' onClick={()=>setModal(true)}>checkout</button>
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