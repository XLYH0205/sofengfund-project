import { LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';

const DiscoverPage = () => {
  const { role, logout } = useAuthStore();
  
  return (
    <div>
      <h1>DiscoverPage</h1>
      {
        role ? 
        <Link to="/"><LogOut className='size-6 cursor-pointer' onClick={logout} /></Link>
        : null
      }
    </div>
    
  )
}

export default DiscoverPage