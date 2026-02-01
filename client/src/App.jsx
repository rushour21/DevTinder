import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './body'
import Profile from './components/Profile'
import Login from './components/login'
import { Provider } from 'react-redux'
import './App.css'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/connections'
import Request from './components/request'
import Chat from './components/Chat'
import LandingPage from './pages/LandingPage'


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<Body />}>
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<Request />} />
              <Route path='/chat' element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
