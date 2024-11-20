import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from './components'
import { SignInButton } from '@clerk/clerk-react'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50 font-Outfit'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App