import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Home/Login'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Home/Register'
import { ProtectedRute } from './components/ProtectedRute'
import NavBar from './components/NavBar'



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
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
