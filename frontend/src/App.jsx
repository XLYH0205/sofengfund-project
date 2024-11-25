import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserSignupPage from './pages/UserSignupPage'
import UserLoginPage from './pages/UserLoginPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/signup' element={<UserSignupPage/>}/>
      <Route path='/login' element={<UserLoginPage/>}/>
    </Routes>
  )
}

export default App
