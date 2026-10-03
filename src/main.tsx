import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
import { ThemeProvider } from './components/theme-provider.tsx'
import ReduxProvider from './redux/ReduxProvider.tsx'
import { AuthInterceptor } from './components/AuthInterceptor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ReduxProvider>
        <BrowserRouter>
          <AuthInterceptor>
            <App />
          </AuthInterceptor>
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
