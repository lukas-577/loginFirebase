import React from 'react'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div className=" h-screen bg-base-200">
      <Outlet></Outlet>
    </div>
  )
}

export default App
