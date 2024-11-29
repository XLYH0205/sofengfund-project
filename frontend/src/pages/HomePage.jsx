import React from 'react'
import { ROLES } from '../../../backend/constants/roles.constants'
import { useAuthStore } from '../store/authUser';

import ModeratorDashboard from './ModeratorDashboard.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { role } = useAuthStore();
  return (
    <>
      {
        role == ROLES.USER ? <Navigate to="/discover" /> 
        : role == ROLES.MOD ? <ModeratorDashboard /> 
        : role == ROLES.ADMIN ? <AdminDashboard /> 
        : null
      }
    </>
  )
}

export default HomePage