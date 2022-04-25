import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './suppliers.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSupplier } from '../../common/redux/supplierSlice';





const Suppliers = () => {

  const [supplier, setSupplier] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [udt,setUdt]=useState({})

  const [count,setCount]=useState(0)
  const val = useSelector((state) => state.supplier.data)
  console.log(val)
  const dispatch=useDispatch()
 
  
  const [data, setData] = useState({
    name: '',
    phone: "",
    address: '',
    company: ''
  })
  
  
  
  const changeHandler = (event) => {
    setData ( { ...data, [event.target.name]: event.target.value })
  }

//supplier data add to supplier
  useEffect(()=>{
    dispatch(fetchSupplier())
    
  },[dispatch,count])


  useEffect(()=>{
    setSupplier(val)
  },[val,count])
  
  console.log(supplier)



  console.log("help")


  //adding supplier

  const addSupplier = async () => {
    try {
      const url = 'http://localhost:8000/api/v1/suppliers/'
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

     
      setCount(count+1)
      setModal(false)
    } catch (err) {
      console.log(err.response)
    }
  }
  //updateSupplier
const update=(udata)=>{
  setUdt({...udt,udata})
  setModalUpdate(!modalUpdate)
}

const updateSupplier=async (id) => {
  try {
    const url = `http://localhost:8000/api/v1/suppliers/${id}/`
    const token = localStorage.getItem('token')
    console.log(token)
    const response = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

   
    setCount(count+1)
    setModalUpdate(false)
  } catch (err) {
    console.log(err.response)
  }
}


  //deleting supplier

  const deleteSupplier = async (id) => {
    try {
      console.log(id)
      const url = `http://localhost:8000/api/v1/suppliers/${id}/`
      const token = localStorage.getItem('token')
      
      const response = await axios.delete(url,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(response)
      setCount(count+1)
      
    } catch (err) {
      console.log(err.response)
    }
  }

  return (


    <div className='supplier'>
       <div className='sidebar'>
        <Sidebar index={4} />
      </div> 
      <div className="mainContainer">
        
        <div className="supplier_main">
          <div className="supplierImg">
            <img src="" alt="hello" />
          </div>
          <div className="supplier_heading">
            <p>SUPPLIERS FORUM</p>
          </div>
          <div className='supplier_add'>
            <button className='button' onClick={() => setModal(true)}>ADD SUPPLIER</button>
          </div>

          {
            modal &&
            <div className='add'>
              <input type="text" placeholder='name' name='name' onChange={changeHandler} />
              <input type="number" placeholder='phone' name='phone' onChange={changeHandler} />
              <input type="text" placeholder='address' name='address' onChange={changeHandler} />
              <input type="text" placeholder='company' name='company' onChange={changeHandler} />
              <button onClick={addSupplier} >Add</button>
            </div>
          }
          {
            modalUpdate &&
            <div className='update'>
              <input type="text" placeholder='name' name='name' onChange={changeHandler} value={udt.name}/>
              <input type="number" placeholder='phone' name='phone' onChange={changeHandler} value={udt.phone} />
              <input type="text" placeholder='address' name='address' onChange={changeHandler} value={udt.address} />
              <input type="text" placeholder='company' name='company' onChange={changeHandler} />
              <button onClick={()=>updateSupplier(udt._id)} >UPDATE</button>
            </div>
          }
          <div className='supplier_table'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">phone</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">company</TableCell>
                    <TableCell align="right">status</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplier.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.company}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right"><button onClick={()=>update(row)}>edit</button></TableCell>
                      <TableCell align="right"><button onClick={()=>deleteSupplier(row._id)}>del</button></TableCell>
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

export default Suppliers