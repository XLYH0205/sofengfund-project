import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { ROLES } from '../../../backend/constants/roles.constants'


const LandingPage = () => {
    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate(`/discover?query=${query}`)
    }


    return (
        <div>
            {/* temp */}
            <h1 className="text-6xl">Landing Page</h1>

            {/* Navbar */}
            <header className="p-4 pb-10 flex items-center justify-between">
                {/* <img src="/logo.png" alt="Logo" className="w-32" /> */}

                {/* Searchbar */}
                <form className="" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Search recipe"
                        className='p-2 rounded bg-black/80 border border-gray-700'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        type='submit'
                        className=''
                    >
                        <Search />
                    </button>
                </form>

                {/* Sign In */}
                <Link to="/login/user" className="text-white bg-gray-600 py-1 px-2 rounded">Sign In</Link>
            </header>

            <div className="text-center text-gray-400">
                {"Administrator Dashboard"}
                <Link to={`/login/${ROLES.ADMIN}`} className="text-red-500 hover:underline">Sign in</Link>
            </div>

            <div className="text-center text-gray-400">
                {"Moderator Dashboard"}
                <Link to={`/login/${ROLES.MOD}`} className="text-red-500 hover:underline">Sign in</Link>
            </div>
        </div>
    )
}

export default LandingPage