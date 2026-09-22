
import { LogIn } from 'lucide-react'
import { Button } from './components/ui/button'
import { Routes, Route } from 'react-router'
import LoginPanel from './pages/LoginForm'
import Services from './pages/Services'
import NavBar from './components/NavBar'
import SignupPanel from './pages/SignupForm'

import Contact from './pages/Contact'
import Home from './pages/Home'
import About from './pages/About'
import AuthFailure from './pages/AuthFailure'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from './redux/slices/appSlice'
import { useEffect, useState } from 'react'
import apiClient from './utils/axiosInterceptor'
import { setCredentials } from './redux/slices/authSlice'
import type { AxiosError } from 'axios'
import { OtpForm } from './components/otp-form'
function App() {
  const dispatch = useDispatch();
  const isNetworkLoading = useSelector(selectIsLoading);
  
  // Track if this is the very first time the app is loading up
  const [isBooting, setIsBooting] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuthSession = async () => {
      try {
        // This request automatically sets Redux app.isLoading to true via interceptors
        const response = await apiClient.post('/auth/refresh');
        
        if (response?.data) {
          const { user, accessToken } = response.data;
          dispatch(setCredentials({ user, accessToken }));
        }
      } catch (error : AxiosError | unknown) {
        console.warn('No active silent-refresh session cookie found.');
      } finally {
        // The request has finished, and now our initial boot check is complete
        setIsBooting(false);
      }
    };

    initializeAuthSession();
  }, [dispatch]);
  

  if (isBooting && isNetworkLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a1a1a', // Solid background blocks flash of underlying UI
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <h2>Securing Workspace...</h2>
        <p style={{ color: '#888' }}>Checking security tokens</p>
      </div>
    );
  }

  return (

    <div style={{ position: 'relative', minHeight: '100vh' }}>

      {/* ✅ Standard Loading Overlay: Operates safely over your actual active pages */}
      {!isBooting && isNetworkLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(2px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <div style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>Loading data...</div>
        </div>
      )}

      <Routes>
        <Route element={<NavBar/>}>
          <Route index element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="services" element={<Services/>} />
          <Route path="contact" element={<Contact/>} />
          
          {/* Login and Signup and Authentication pages */}
          <Route path="auth">
            <Route path="login" element={<LoginPanel/>} />
            <Route path="signup" element={<SignupPanel/>} />
            <Route path="failure" element={<AuthFailure/>} />
            <Route path="verify-otp" element={<OtpForm/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
