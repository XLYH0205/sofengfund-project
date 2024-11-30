import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authUser.js'

const ModeratorDashboard = () => {
  const { logout } = useAuthStore()

  return (
    <div>
      ModeratorDashboard
      <LogOut className='size-6 cursor-pointer' onClick={logout} />
    </div>
  )
}

export default ModeratorDashboard