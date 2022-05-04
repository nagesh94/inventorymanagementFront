import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './setting.scss'

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../common/redux/userSlice';
import axios from 'axios';
import { fetchsidebar } from '../../common/redux/supplierSlice';
import PersonIcon from '@mui/icons-material/Person';


const Setting = () => {


  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const val = useSelector(state => state.user.data)
  const [modal, setModal] = useState(false)
  const [error,setError]=useState('')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  console.log(data)

  const updatePassword = async () => {
    try {

      const url = 'http://localhost:8000/api/v1/users/updatepassword/'
      const token = localStorage.getItem('token')

      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }


      })

      console.log(response)
      setModal(false)


    } catch (err) {
      setError(err.response.data.message)
    }
  }
  const [user, setUser] = useState("")

  useEffect(() => {
    dispatch(fetchsidebar())
    setUser(val)
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchsidebar())
    setUser(val)
  }, [val])





  return (
    <div className='setting'>
      <div className='sidebar'>
        <Sidebar index={8} />
      </div>
      <div className="mainContainer">
        <div className="setting_main">
          <div className='profile_container'>
            <PersonIcon fontSize="large" />
            <h1 className='title_profile'>User Profile</h1>
            <hr />

          </div>
          {error && <p style={{color:"red"}}>{error}</p>}
          <div className='user_profile'>
            

              <p className='filds'> FirstName :-  {user.firstname}   </p>

              <p className='filds'> LastName :- {user.lastname}</p>


              <p className='filds'> Email :-{user.email}</p>
              <p className='filds'> Address :-{user.address}</p>
              <p className='filds'> Gender:-{user.gender}</p>
              <p className='filds'> Company :-{user.company}</p>
              <p className='filds'> DOB :-{user.DOB}</p>

            </div>
          
          {
            modal && <div className='text' >
              <input type="text" placeholder='Current Password' onChange={changeHandler} name='password' />
              <input type="text" placeholder='New Password' onChange={changeHandler} name='newPassword' />
              <input type="text" placeholder=' Confirm Password' onChange={changeHandler} name='confirmPassword' />

              <br />
              <button className='button' style={{ marginTop: "1rem" }} onClick={updatePassword}>Update</button>
            </div>
          }

          {modal ? '' : <button className='button' onClick={() => setModal(true)} >Update Password</button>}

        </div>
      </div>
    </div>
  )
}

export default Setting