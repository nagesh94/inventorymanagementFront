import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, fetchProductAll } from '../../common/redux/productSlice'
import Sidebar from '../../components/sidebar/Sidebar'
import './product.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { cartAdd } from '../../common/redux/sellSlice'

const Product = () => {

  const dispatch = useDispatch()
  let val = useSelector(state => state.product.allData)
  const filterVal=useSelector(state => state.product.data)
  const cartData=useSelector(state=>state.sell.data)
  if(filterVal.length>0)
  {
    val=filterVal
  }
  const [count,setCount]=useState(0)
  const [filterOption, setFilterOption] = useState('')
  const [filter,setFilter]=useState('')
  const [sort,setSort]=useState('')
  
  const options=['_id','name','price','quantity','category','supplier','brand','color','size']

  const [cart,setCart]=useState(cartData)



  useEffect(() => {
    dispatch(fetchProductAll())
  }, [])


  useEffect(()=>{
    dispatch(cartAdd(cart))
  },[cart])

  const changeFilter = (event) => {
    setFilterOption(event.target.value)
  }
  
  const changeHandler=(event)=>{
    setFilter(event.target.value)
    setCount(count+1)
  }
  const sortHandler=(event)=>{
    setSort(event.target.value)
  }
  const search=()=>{
    dispatch(fetchProduct({filterOption,filter,sort}))
  }

const addToCart=(data)=>{
  data={...data,quant:count}
  data={...data,amount:(data.quant*1)*data.price}
  
  setCart([...cart,data])
  
}
console.log(cart)


  return (
    <div className='product'>
      <div className='sidebar'>
        <Sidebar index={7} />
      </div>
      <div className="mainContainer">
        <div className="productMain">
          <div className="productHeading">
            <p>all products here</p>
          </div>

          <div className="productFilter">
            <input type="text" placeholder='search' onChange={changeHandler} />

            <select name="filter" onChange={changeFilter} >
              <option value="">filter</option>
              
               { options.map((item, index) => {
                  return <option key={index} >{item}</option>
                })}
              
            </select>
            <button onClick={search}>search</button>



          </div>
          <div className="productSort">
            <label htmlFor="price">sortBy</label>
            <input type="radio" name='price' value='price' onClick={sortHandler}  />
            <input type="radio" name='price' value='-price' onClick={sortHandler} />

          </div>
          <div className="productTable">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">price</TableCell>
                    <TableCell align="right">total quantity</TableCell>
                    <TableCell align="right">category</TableCell>
                    <TableCell align="right">supplier</TableCell>
                    <TableCell align="right">brand</TableCell>
                    <TableCell align="right">color</TableCell>
                    <TableCell align="right">size</TableCell>
                    <TableCell align="right">selected quant</TableCell>
                    

                    <TableCell align="right">add to cart</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {val.map((row, index) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.supplier}</TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">{row.color}</TableCell>
                      <TableCell align="right">{row.size}</TableCell>
                      <TableCell align="right"><input type="number" min='1' defaultValue='1' max={row.quantity}  onChange={(event)=>setCount(event.target.value)} /></TableCell>
                      
                      
                     
                      
                      <TableCell align="right"><button onClick={()=>addToCart(row)} >add</button></TableCell>
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

export default Product