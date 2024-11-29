import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/authUser'
import { Link, useParams } from 'react-router-dom'
import { ROLES } from '../../../backend/constants/roles.constants'

const UserSignupPage = () => {
  const { role } = useParams();
  if (!Object.values(ROLES).includes(role)) return <Navigate to="/404" />

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [key, setKey] = useState("")

  const { signup } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault()
    signup({ email, username, password, key }, role)
  }

  return (
    <div className='h-screen w-full'>
      {/* temp */}
      <h1 className="text-6xl">UserSignupPage</h1>

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
          <label htmlFor='username' className=''>
            Username
          </label>
          <input
            type='text'
            className='px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring'
            placeholder='yourUsername'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Sign Up
        </button>
      </form>

      <div className="text-gray-400">
        {"Already a member? "}
        <Link to={`/login/${role}`} className="text-red-500 hover:underline">Sign in</Link>
      </div>

    </div>
  )
}

export default UserSignupPage