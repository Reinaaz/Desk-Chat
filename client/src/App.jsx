import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const { authUser } = useContext(AuthContext)
  return (
    <div className="bg-[url('https://i.pinimg.com/736x/fa/df/04/fadf04811886c048ee0b80c0f768d945.jpg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path= '/' element={authUser ? <HomePage/> : <Navigate to= "/login"/>} />
        <Route path= '/login' element={!authUser ? <LoginPage/>  : <Navigate to= "/"/>} />
        <Route path= '/Profile' element={authUser ? <ProfilePage/>: <Navigate to= "/login"/>}/>
      </Routes>
    </div>
  )
}


export default App;
