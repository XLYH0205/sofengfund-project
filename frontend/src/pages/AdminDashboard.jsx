import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authUser.js'

const AdminDashboard = () => {
  const { logout } = useAuthStore()

  return (
    <div>
      AdminDashboard
      <LogOut className='size-6 cursor-pointer' onClick={logout} />
    </div>
  )
}

export default AdminDashboard