import React from 'react'
import Navbar from './Navbar'

interface props {
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="font-mono">
      <Navbar></Navbar>
      {children}
    </div>
  )
}

export default Layout
