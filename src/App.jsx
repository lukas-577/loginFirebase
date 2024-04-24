import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import { AuthProvider } from './context/authContext'
import Register from './pages/Home/Register'



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
