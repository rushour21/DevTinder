import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Body from './body'
import Profile from './component/profle'
import Login from './component/login'
import { Provider } from 'react-redux'
import './App.css'
import appStore from './utils/appStore'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route path='/profile' element={<Profile/>} />
              <Route path='/login' element={<Login/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
