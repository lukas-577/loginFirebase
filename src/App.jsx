import React from 'react'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div className="bg-base-100">
      <Outlet></Outlet>
    </div>
  )
}

export default App
