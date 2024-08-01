import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/components/Login'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Home/components/Register'
import { ProtectedRute } from './components/ProtectedRute'
import NavBar from './components/NavBar'
import ForgotPassword from './pages/Home/components/Forgotpass'
import Confirmation from './pages/Home/components/Confirmation'



function App() {
  return (
    <div className=" h-screen bg-base-200 flex">

      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRute>
                <Home />
              </ProtectedRute>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
