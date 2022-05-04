import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBrand, fetchCategory, fetchColor, fetchSize } from '../../common/redux/attributeSlice'
import './attributeCard.scss'

const AttributeCard = ({ attribute, list,val }) => {

    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [data,setData]=useState({})

    const handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }

    useEffect(() => {
        dispatch(fetchColor())
        dispatch(fetchCategory())
        dispatch(fetchSize())
        dispatch(fetchBrand())
    
    }, [dispatch, count])

    //add item
    const addItem= async () => {
        try {
          const url = `http://localhost:8000/api/v1/${val}/`
          const token = localStorage.getItem('token')
          console.log(token)
          const response = await axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
    
         
          setCount(count+1)
     
        } catch (err) {
          console.log(err.response)
        }
      }
    
    //delete item
    const deleteitem = async (id) => {
        try {
         
            console.log(id)
            const url = `http://localhost:8000/api/v1/${val}/${id}/`
            const token = localStorage.getItem('token')

            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response)
            setCount(count + 1)

        } catch (err) {
            console.log(err.response)
        }
    }
    return (
        

        <Grid item md={5} sm={11} className='grid'>
            <div className='add_item'>
                <input  type="text" placeholder={`add ${attribute} `} name={`${attribute}`} onChange={handleChange} />
                <button className='button' onClick={addItem} >ADD</button>
            </div>
            
            {list.map((item, index) => {
                return <div key={index} className='grid_div' >
                    <p>{item[attribute]}</p>
                    <button className='button' onClick={() => deleteitem(item._id)} >Delete</button>
                </div>
                 })}
               
        
        </Grid>

    )
}

export default AttributeCard