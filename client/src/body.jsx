import React from 'react'
import Footer from './component/footer'
import Navbar from './component/navbar'
import {Outlet} from 'react-router-dom'

export default function body() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>

    </>
  )
}
