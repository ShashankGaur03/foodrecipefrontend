import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.tsx'
import { AuthenticationContextProvider } from './context/auth-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <App />
      <ToastContainer />
    </AuthenticationContextProvider>
  </StrictMode>,
)