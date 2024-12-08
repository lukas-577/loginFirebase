import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes/Router.jsx'
import './index.css'
import './app.css'
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx'
import { PhotoProvider } from './context/PhotoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PhotoProvider>
        <RouterProvider router={router}></RouterProvider>
      </PhotoProvider>
    </AuthProvider>
  </React.StrictMode>,
)
