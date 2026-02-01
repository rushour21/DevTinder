import React, { useEffect } from 'react'
import Footer from './components/footer'
import Navbar from './components/navbar'

import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'

export default function body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)

  const fethUser = async () => {

    if (userData) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile/view`,
        { withCredentials: true }
      )
      dispatch(addUser(res.data.user))
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fethUser();
  }, [])
  return (
    <div className='flex justify-between flex-col w-screen h-screen bg-gray-200'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
