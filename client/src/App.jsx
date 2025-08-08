import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Body from './body'
import Profile from './component/profle'
import Login from './component/login'
import { Provider } from 'react-redux'
import './App.css'
import appStore from './utils/appStore'
import Feed from './component/feed'
import Connections from './component/connections'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route path='/' element={<Feed/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/connections' element={<Connections/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
