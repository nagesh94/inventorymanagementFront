import React, { useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './checkOut.scss'

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { MdCropDin } from 'react-icons/md';

const CheckOut = ({ close, totalAmount, data }) => {

    const { formState: { errors }, register, handleSubmit } = useForm();
    const ref = useRef()
    const [error,setError]=useState('')

    const [customer, setCustomer] = useState({
        name: "",
        phone: '',
        email: ''
    })

    const changeHandler = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })


    }
    console.log(customer)

    const ordersData = { totalAmount, productDetails: data }




    const submit = async () => {
        try {
            const url = 'http://localhost:8000/api/v1/customers'
            const token = localStorage.getItem('token')
            console.log("hello")

            const response = await axios.post(url, customer, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }


            })
            const customerId = response.data.data._id
            addOrder(customerId)

            setError('')


        } catch (err) {
            setError(err.response.data.message)
            console.log(err.response)
        }

    }
    const addOrder=async (cid) => {
        try {
            const url1 = `http://localhost:8000/api/v1/users/${cid}/orders`
            const token = localStorage.getItem('token')
    
            const response1 = await axios.post(url1, ordersData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
    
    
            })
            console.log(response1)
            
            data.forEach(async (item)=>{
           
                
                  try {
                      const url2 = `http://localhost:8000/api/v1/products/${item._id}`
                      const token = localStorage.getItem('token')
                      const changedQuant={quantity:item.quantity-(item.quant*1)}
                      const response2 = await axios.patch(url2, changedQuant, {
                          headers: {
                              'Authorization': `Bearer ${token}`
                          }
              
              
                      })
                      console.log(response2)
                     
                  } catch (err) {
                      console.log(err)
                    setError(err.response.data.message)
                      
                  }
                 
             })
           
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }

    




    return (
        <div className='checkOut'>

            <div className="mainContainer">

                <div className="main">
                    <div className="checkOut">
                        <p>Customer Details</p>
                    </div>
                    {error && <p style={{color:"red"}}>{error}</p>}
                    <div className="customerForm">
                        <input type="text" placeholder='Enter your name...' name='name' required onChange={changeHandler} />
                        <input type="number" placeholder='Enter your contact number' name='phone' required onChange={changeHandler} />
                        <input type="email" placeholder='Enter your email address' name='email' required onChange={changeHandler} />
                        <button className='button' onClick={submit} >Pay</button>
                       
                    <button className='button' onClick={() => close(false)}>Order Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CheckOut