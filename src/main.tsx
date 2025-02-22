import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthenticationContextProvider } from './context/auth-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </StrictMode>,
)