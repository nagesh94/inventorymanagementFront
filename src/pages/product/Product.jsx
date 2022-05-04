import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, fetchProductAll } from '../../common/redux/productSlice'
import Sidebar from '../../components/sidebar/Sidebar'
import './product.scss'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { cartAdd } from '../../common/redux/sellSlice'

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


const Product = () => {

  const dispatch = useDispatch()
  let val = useSelector(state => state.product.allData)
  const filterVal = useSelector(state => state.product.data)
  const cartData = useSelector(state => state.sell.data)
  if (filterVal.length > 0) {
    val = filterVal
  }
  const [count, setCount] = useState(0)
  const [filterOption, setFilterOption] = useState('')
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

  const options = ['_id', 'name', 'price', 'quantity', 'category', 'supplier', 'brand', 'color', 'size']

  const [cart, setCart] = useState(cartData)



  useEffect(() => {
    dispatch(fetchProductAll())
  }, [])


  useEffect(() => {
    dispatch(cartAdd(cart))
  }, [cart])

  const changeFilter = (event) => {
    setFilterOption(event.target.value)
  }

  const changeHandler = (event) => {
    setFilter(event.target.value)
    setCount(count + 1)
  }
  const sortHandler = (event) => {
    setSort(event.target.value)
  }
  const search = () => {
    dispatch(fetchProduct({ filterOption, filter, sort }))
  }

  const addToCart = (data) => {
    data = { ...data, quant: count }
    data = { ...data, amount: (data.quant * 1) * data.price }

    setCart([...cart, data])

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
            <p>PRODUCT LIST</p>
          </div>

          <div className="productFilter">
            <input type="text" placeholder='search' onChange={changeHandler} />

            <select name="filter" onChange={changeFilter} >
              <option value="">filter</option>

              {options.map((item, index) => {
                return <option key={index} >{item}</option>
              })}

            </select>



          </div>
          <div className="productSort">
            <label htmlFor="price">Sort By price : </label>
            
            <input type="radio" name="price" value="price" defaultChecked onClick={sortHandler} />
            <label htmlFor="price">Low</label>
            <input type="radio" name="price" value="-price " onClick={sortHandler} />
            <label htmlFor="price">High</label><br></br>

          </div>
            <button className='button' onClick={search}>Search</button>
          <div className="productTable">
            <TableContainer component={Paper}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">id</StyledTableCell>
                    <StyledTableCell align="center">name</StyledTableCell>
                    <StyledTableCell align="center">price</StyledTableCell>
                    <StyledTableCell align="center">total quantity</StyledTableCell>
                    <StyledTableCell align="center">category</StyledTableCell>
                    <StyledTableCell align="center">supplier</StyledTableCell>
                    <StyledTableCell align="center">brand</StyledTableCell>
                    <StyledTableCell align="center">color</StyledTableCell>
                    <StyledTableCell align="center">size</StyledTableCell>
                    <StyledTableCell align="center">selected quant</StyledTableCell>


                    <StyledTableCell align="center">Add to Cart</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {val.map((row, index) => (
                    <StyledTableRow
                      key={row._id}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row._id}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                      <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                      <StyledTableCell align="center">{row.category}</StyledTableCell>
                      <StyledTableCell align="center">{row.supplier}</StyledTableCell>
                      <StyledTableCell align="center">{row.brand}</StyledTableCell>
                      <StyledTableCell align="center">{row.color}</StyledTableCell>
                      <StyledTableCell align="center">{row.size}</StyledTableCell>
                      <StyledTableCell align="center"><input type="number" min='1'  defaultValue='1' max={row.quantity} onChange={(event) => setCount(event.target.value)} /></StyledTableCell>




                      <StyledTableCell align="center"><button className='button' onClick={() => addToCart(row)} >Add</button></StyledTableCell>
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

export default Product