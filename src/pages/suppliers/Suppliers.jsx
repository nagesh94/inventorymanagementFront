import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './suppliers.scss'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSupplier } from '../../common/redux/supplierSlice';


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
            <img src="https://tse4.mm.bing.net/th?id=OIP.dNj79HQuADBh8O69OpPxIQHaCe&pid=Api&P=0&w=473&h=157" alt="hello" />
          </div>
          <div className="supplier_heading">
            <p>Suppliers Forum</p>
          </div>
          <div className='supplier_add'>
            <button className='button' onClick={() => setModal(true)}>Add Supplier</button>
          </div>

          {
            modal &&
            <div className='add'>
              <input type="text" placeholder='Name' name='name' onChange={changeHandler} />
              <input type="number" placeholder='Phone' name='phone' onChange={changeHandler} /><br/>
              <input type="text" placeholder='Address' name='address' onChange={changeHandler} />
              <input type="text" placeholder='Company' name='company' onChange={changeHandler} />
              <br/>
              <button className='button_add' onClick={addSupplier} >Add</button>
            </div>
          }
          {
            modalUpdate &&
            <div className='update'>
              <input type="text" placeholder='Name' name='name' onChange={changeHandler} value={udt.name}/>
              <input type="number" placeholder='Phone' name='phone' onChange={changeHandler} value={udt.phone} /><br/>
              <input type="text" placeholder='Address' name='address' onChange={changeHandler} value={udt.address} />
              <input type="text" placeholder='Company' name='company' onChange={changeHandler} />
              <button className='button_update' onClick={()=>updateSupplier(udt._id)} >Update</button>
            </div>
          }
          <div className='supplier_table'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">phone</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="right">company</StyledTableCell>
                    <StyledTableCell align="right">status</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supplier.map((row) => (
                    <StyledTableRow
                      key={row._id}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.phone}</StyledTableCell>
                      <StyledTableCell align="right">{row.address}</StyledTableCell>
                      <StyledTableCell align="center">{row.company}</StyledTableCell>
                      <StyledTableCell align="right">{row.status}</StyledTableCell>
                      <StyledTableCell align="center"><button className="button_ed" onClick={()=>update(row)}>Edit</button></StyledTableCell>
                      <StyledTableCell align="center"><button className="button_ed" onClick={()=>deleteSupplier(row._id)}>Delete</button></StyledTableCell>
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

export default Suppliers