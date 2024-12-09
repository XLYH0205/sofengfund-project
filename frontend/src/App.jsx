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
import AddRecipePage from './pages/AddRecipePage.jsx'

function App() {
  const { account, role, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    console.log("account1: ", account, "role1: ", role); //temp
    authCheck();
  }, [authCheck]);

  // temp{----
  useEffect(() => {
    console.log("account2: ", account, "role2: ", role);
  }, [account, role]);
  // -----}temp

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
        <Route path='/' element={account ? <HomePage /> : <LandingPage />} />
        <Route path="/signup/:role" element={role ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/login/:role" element={role ? <Navigate to="/" /> : <LoginPage />} />
        
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path='/*' element={<NotFoundPage />} />

        <Route path='/my/add-recipe' element={!role ? <Navigate to="/" /> : <AddRecipePage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
