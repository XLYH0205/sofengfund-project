import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/authUser'
import { Link } from 'react-router-dom'

const UserSignupPage = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signup } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault()
    signup({ email, username, password })
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

        <button className='w-16 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700'>
          Login
        </button>
      </form>

      <div className="text-gray-400">
        {"Already a member? "}
        <Link to="/signup" className="text-red-500 hover:underline">Sign in</Link>
      </div>

    </div>
  )
}

export default UserSignupPage