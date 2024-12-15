import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Result from './pages/Result.jsx'
import BuyCredit from './pages/BuyCreadit.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import AppContextProvider from './context/AppContext.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/result",
        element: <Result />
      },
      {
        path: "/buy",
        element: <BuyCredit />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
