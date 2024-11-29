import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { ROLES } from '../../../backend/constants/roles.constants'

const LoginPage = () => {
  const { role } = useParams();
  if (!Object.values(ROLES).includes(role)) return <Navigate to="/404" />;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [key, setKey] = useState("")

  const { login } = useAuthStore()

  const handleLogin = (e) => {
    e.preventDefault()
    login({ email, password, key }, role)
  }

  return (
    <div className='h-screen w-full'>
      {/* temp */}
      <h1 className="text-6xl">LoginPage</h1>

      <form
        className=""
        onSubmit={handleLogin}
      >
        <div>
          <label htmlFor='email' className=''>
            Email
          </label>
          <input
            type='email'
            className='px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring'
            placeholder='you@example.com'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password' className=''>
            Password
          </label>
          <input
            type='password'
            className='px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring'
            placeholder='********'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {role == ROLES.ADMIN || role == ROLES.MOD ?
          <div>
            <label htmlFor='key' className=''>
              Key
            </label>
            <input
              type='password'
              className='px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring'
              placeholder='********'
              id='key'
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div> : null}

        <button className='w-16 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700'>
          Login
        </button>
      </form>

      <div className="text-gray-400">
        {"Don't have an account? "}
        <Link to={`/signup/${role}`} className="text-red-500 hover:underline">Sign up</Link>
      </div>

    </div>
  )
}

export default LoginPage