import React from 'react'
import {Routes, Route } from "react-router-dom";
import Registeration from './Components/Registeration';
import Home from './Components/Home';
import Login from './Components/Login';
import UserAccount from './Components/UserAccount';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/register' element={<Registeration />} />
      <Route path='/user/login' element={<Login />} />
      <Route path='/user/UserAccount/:user' element={<UserAccount/>} />


    </Routes>

    
    </>
  )
}

export default App

