import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Body from './body'
import Profile from './component/profle'
import Login from './component/login'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/login' element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
