import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from './components'
import { SignInButton } from '@clerk/clerk-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50 font-Outfit'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App