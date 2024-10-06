import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes/Router.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
