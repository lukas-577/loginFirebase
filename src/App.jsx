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
import CameraPage from './pages/Camera/CameraPage'
import { PhotoProvider } from './context/PhotoContext'
import PhotoReviewPage from './pages/Camera/PhotoReviewPage'
import Profile from './pages/Profile/Profile'
import Afiliacion from './pages/Afiliation/Afiliation'
import Ubicacion from './pages/getUbi/Ubicacion'



function App() {
  return (
    <div className=" h-screen bg-base-200 flex">

      <AuthProvider>
        <PhotoProvider>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRute>
                  <Home />
                </ProtectedRute>
              } />
            <Route
              path='/camera'
              element={
                <ProtectedRute>
                  <CameraPage />
                </ProtectedRute>
              }
            />
            <Route
              path='/review-photo'
              element={
                <ProtectedRute>
                  <PhotoReviewPage />
                </ProtectedRute>
              }
            /> 
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register></Register>} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/afiliacion' element={<Afiliacion />} />
            <Route path='/ubicacion' element={<Ubicacion />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </PhotoProvider>
      </AuthProvider>
    </div>
  )
}

export default App
