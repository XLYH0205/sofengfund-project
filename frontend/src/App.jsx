import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import LandingPage from './pages/LandingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useAuthStore } from './store/authUser.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import DiscoverPage from './pages/DiscoverPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ModeratorDashboard from './pages/ModeratorDashboard.jsx'

function App() {
  const { account, role, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    console.log("account1: ", account, "role1: ", role);
    authCheck();
  }, [authCheck]);

  useEffect(() => {
    console.log("account2: ", account, "role2: ", role);
  }, [account, role]);

  if (isCheckingAuth) {
    // TODO: loading screen
    return (
      <div className="h-screen">
        <div className='flex justify-center items-center h-full bg-black'>
          <Loader className='animate-spin size-10 text-red-600' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={!account ? <LandingPage /> : <Navigate to={`/${role}`} />} />
        
        <Route 
          path="/signup/:role" 
          element={
            role ? (
              role === 'admin' ? <Navigate to="/admin" /> :
              role === 'moderator' ? <Navigate to="/moderator" /> :
              <Navigate to="/user" />
            ) : (
              <SignupPage />
            )
          } 
        />
        
        <Route 
          path="/login/:role" 
          element={
            role ? (
              role === 'admin' ? <Navigate to="/admin" /> :
              role === 'moderator' ? <Navigate to="/moderator" /> :
              <Navigate to="/user" />
            ) : (
              <LoginPage />
            )
          } 
        />

        {/* Dashboard Routes */}
        <Route 
          path="/user" 
          element={
            role === 'user' ? <HomePage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/admin" 
          element={
            role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/moderator" 
          element={
            role === 'moderator' ? <ModeratorDashboard /> : <Navigate to="/" />
          } 
        />

        <Route path="/discover" element={<DiscoverPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
